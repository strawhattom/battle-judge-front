import React, { useReducer } from 'react';
import type { FormChallengeProps } from '@/types/ChallengesProps';
import { createOne } from '@/utils/services/challenge.service';
import ReactMd from 'react-markdown';
import Input from '@/components/Input';
import InputFile from '../Input/InputFile';
import Button from '../Button';
import { CHALLENGE_TEMPLATE } from '@/utils/constants';

interface ChallengeState {
  id?: number;
  title: string;
  category: string;
  points: number;
  description: string;
  flag: string;
  message: string;
}

interface FileState {
  files: FileList | null;
  isFilePicked: boolean;
}

const initialState: ChallengeState = {
  title: '',
  category: '',
  points: 300,
  description: CHALLENGE_TEMPLATE,
  flag: '',
  message: ''
};

const fileInitialState: FileState = {
  files: null,
  isFilePicked: false
};

const reducer = (
  state: ChallengeState,
  action: { type: string; payload: string }
) => {
  return { ...state, [action.type]: action.payload };
};

const fileReducer = (
  state: FileState,
  action: { type: string; payload: FileList }
) => {
  switch (action.type) {
    case 'upload':
      return {
        ...state,
        files: action.payload,
        isFilePicked: true
      };
    case 'clear':
      return {
        ...state,
        files: null,
        isFilePicked: false
      };
    case 'message':
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
};

const validateForm = (state: ChallengeState) => {
  return (
    state.title.length > 0 &&
    state.category.length > 0 &&
    state.points > 0 &&
    state.description.length > 0 &&
    state.flag.length > 0
  );
};

const ChallengeForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [fileState, dispatchFile] = useReducer(fileReducer, fileInitialState);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const action = {
      type: e.currentTarget.name,
      payload: e.currentTarget.value
    };
    dispatch(action);
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      dispatchFile({ type: 'upload', payload: files });
    }
  };

  const handleFilesClear = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (fileState.files) {
      dispatchFile({ type: 'clear', payload: fileState.files });
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!validateForm(state)) {
      dispatch({
        type: 'message',
        payload: 'Veuillez remplir tous les champs'
      });
      return;
    }

    const challenge: FormChallengeProps = {
      ...state,
      resources: fileState.files
    };
    try {
      const formData = new FormData();

      for (const key in challenge) {
        if (key === 'resources' && challenge[key] !== null) {
          for (const file of challenge[key]) {
            formData.append('resources', file);
          }
        } else {
          formData.append(key, challenge[key]);
        }
      }
      console.log(formData);
      const data = await createOne(formData);
      dispatch({ type: 'message', payload: 'Exercice crée !' });
      console.log(data);
    } catch (err) {
      return;
    }
  };

  return (
    <>
      <h1>Challenge Form</h1>
      {state.message.length > 0 && <p>{state.message}</p>}
      <form className="form form-container">
        <Input
          type="text"
          name="title"
          label="Titre"
          onChange={onChange}
          placeholder="Titre de l'exercice"
        />
        <Input
          type="text"
          name="category"
          label="Categorie"
          onChange={onChange}
          placeholder="Catégorie de l'exercice"
        />
        <Input
          type="number"
          name="points"
          label="Points"
          onChange={onChange}
          placeholder="Nombre de points"
          value={300}
        />

        <div className="form-markdown">
          <div className="form-markdown-editor">
            <h3>Markdown</h3>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              onChange={onChange}
              placeholder="Description de l'exercice"
              value={state.description}
              rows={10}
              cols={50}
            />
          </div>
          <div className="form-markdown-preview">
            <h3>Prévisualisation</h3>
            <ReactMd>{state.description}</ReactMd>
          </div>
        </div>

        <Input
          type="text"
          name="flag"
          label="Flag"
          onChange={onChange}
          placeholder="Flag de l'exercice"
        />
        <div>
          <InputFile
            type="file"
            name="files"
            label="Fichiers"
            onChange={onChangeFile}
          />
          {fileState.files && fileState.files.length > 0 && (
            <ul>
              {Array.from(fileState.files).map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
          <Button color="orange" type="button" onClick={handleFilesClear}>
            Réinitialiser les fichiers
          </Button>
        </div>

        <Button color="green" type="submit" onClick={handleSubmit}>
          Créer
        </Button>
      </form>
    </>
  );
};

export default ChallengeForm;
