import React, { useReducer } from 'react';
import { useLoaderData } from 'react-router-dom';
import type {
  ChallengeProps,
  FormChallengeProps
} from '@/types/ChallengesProps';
import { createOne } from '@/utils/services/challenge.service';
import ReactMd from 'react-markdown';
import Input from '@/components/Input';
import InputFile from '../Input/InputFile';
import Button from '../Button';

interface ChallengeState {
  id: number;
  title: string;
  category: string;
  points: number;
  description: string;
  flag: string;
  error: string;
}

interface FileState {
  files: FileList | null;
  isFilePicked: boolean;
}

const initialState: ChallengeState = {
  id: -1,
  title: '',
  category: '',
  points: 300,
  description: '',
  flag: '',
  error: ''
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
    case 'error':
      return {
        ...state,
        error: action.payload
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

const sendFile = (
  name: string,
  type: string,
  buffer: { type: string; data: [] }
) => {
  if (!buffer.data || !buffer.type || buffer.type !== 'Buffer')
    throw new Error('buffer is not an array');

  console.log(`Downloading ${name}, type of ${type}`);

  const arrayBuffer = new Uint8Array(buffer.data);
  const file = new File([arrayBuffer], name, { type });

  // Trigger download event
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(file);
  link.download = name;
  link.click();
};

const ChallengeForm: React.FC = () => {
  const data = useLoaderData() as ChallengeProps;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [fileState, dispatchFile] = useReducer(fileReducer, fileInitialState);

  React.useEffect(() => {
    console.log(data);
    if (!data) return;
    const { id, title, category, points, description, flag } = data;
    dispatch({ type: 'id', payload: id.toString() });
    dispatch({ type: 'title', payload: title });
    dispatch({ type: 'category', payload: category });
    dispatch({ type: 'points', payload: points.toString() });
    dispatch({ type: 'description', payload: description });
    dispatch({ type: 'flag', payload: flag });

    if (!data.resources) return;
    const tempFile = data.resources[0];
    console.log(tempFile);
    sendFile(tempFile.originalname, tempFile.mimetype, tempFile.buffer);
  }, []);

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
      dispatch({ type: 'error', payload: 'Veuillez remplir tous les champs' });
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
      console.log(data);
    } catch (err) {
      return;
    }
  };

  return (
    <>
      <h1>Challenge Form</h1>
      {state.error.length > 0 && <p className="error">{state.error}</p>}
      <form className="form admin-form">
        <Input
          type="text"
          name="title"
          label="Titre"
          value={state.title}
          onChange={onChange}
          placeholder="Titre de l'exercice"
        />
        <Input
          type="text"
          name="category"
          label="Categorie"
          value={state.category}
          onChange={onChange}
          placeholder="Catégorie de l'exercice"
        />
        <Input
          type="number"
          name="points"
          label="Points"
          value={state.points}
          onChange={onChange}
          placeholder="Nombre de points"
        />

        <div className="form-markdown">
          <div className="form-markdown-editor">
            <h3>Markdown</h3>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={state.description}
              onChange={onChange}
              placeholder="Description de l'exercice"
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
          value={state.flag}
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
