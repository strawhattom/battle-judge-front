import React, { useReducer } from 'react';
import type { FormChallengeProps } from '@/types/ChallengesProps';
import { createOne } from '@/utils/services/challenge.service';
import ReactMd from 'react-markdown';
import Input from '@/components/Input';
import InputFile from '../Input/InputFile';
import { CHALLENGE_TEMPLATE } from '@/utils/constants';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface ChallengeState {
  id?: number;
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
  title: '',
  category: '',
  points: 300,
  description: CHALLENGE_TEMPLATE,
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
          // @ts-ignore
          for (const file of challenge[key]) {
            formData.append('resources', file);
          }
        } else {
          // @ts-ignore
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
      <div>
        <h1 className="text-4xl font-bold flex justify-center mt-3">
          Challenge Form
        </h1>
        {state.error.length > 0 && <p className="error">{state.error}</p>}

        <form className="flex flex-col justify-center items-center mt-4">
          <div className="w-96">
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
          </div>

          <div className="flex w-full justify-center text-center mt-3">
            <div className="m-2">
              <h3 className="text-xl">Description en Markdown</h3>
              <textarea
                className="border-2 border-gray-500 rounded	"
                name="description"
                id="description"
                onChange={onChange}
                placeholder="Description de l'exercice"
                value={state.description}
                rows={10}
                cols={50}
              />
            </div>
            <div className="w-96">
              <h3 className="text-xl">Prévisualisation</h3>
              <ReactMd className="text-left w-96 overflow-scroll max-h-60">
                {state.description}
              </ReactMd>
            </div>
          </div>

          <div className="w-96">
            <Input
              type="text"
              name="flag"
              label="Flag"
              onChange={onChange}
              placeholder="Flag de l'exercice"
            />
          </div>

          <div className="w-96">
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
          </div>

          <div className="w-96 flex justify-between">
            <div className="inline-block">
              <button
                type="button"
                onClick={handleFilesClear}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 mt-8 rounded"
              >
                <ArrowPathIcon className="w-5 h-5 mr-1 inline-block" />
                {'Réinitialiser les fichiers'}
              </button>
            </div>

            <div className="inline-block">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mt-8 rounded"
              >
                <PlusIcon className="w-5 h-5 mr-1 inline-block" />
                {'Créer'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChallengeForm;
