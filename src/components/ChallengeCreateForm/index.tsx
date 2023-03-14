import React, { useReducer } from 'react';
import type { FormChallengeProps } from '@/types/ChallengeProps';
import { createOne } from '@/utils/services/challenge.service';
import ReactMd from 'react-markdown';
import { Input, InputFile } from '@/components';
import { CHALLENGE_TEMPLATE } from '@/utils/constants';
import { PlusIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Button from '../Button';

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
  files: FileList | File[] | [];
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
  files: [],
  isFilePicked: false
};

// Définition du reducer pour les états de formulaire du challenge
const reducer = (
  state: ChallengeState,
  action: { type: string; payload: string }
) => {
  // Modifie l'état du champ correspondant à l'action en utilisant le nom de la clé et la valeur de la payload
  return { ...state, [action.type]: action.payload };
};

// Définition du reducer pour les fichiers uploadés
const fileReducer = (
  state: FileState,
  action: { type: string; payload: FileList | File[] | [] }
) => {
  switch (action.type) {
    case 'upload':
      // Met à jour les fichiers uploadés et change l'état pour signaler qu'un fichier a été sélectionné
      return {
        ...state,
        files: action.payload,
        isFilePicked: true
      };
    case 'clear':
      // Supprime tous les fichiers sélectionnés et change l'état pour signaler qu'aucun fichier n'a été sélectionné
      return {
        ...state,
        files: [],
        isFilePicked: false
      };
    case 'message':
      // Met à jour le message d'état de l'upload
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
};

// Fonction de validation de formulaire
const validateForm = (state: ChallengeState) => {
  // Vérifie que tous les champs sont remplis avec des valeurs valides
  return (
    state.title.length > 0 &&
    state.category.length > 0 &&
    state.points > 0 &&
    state.description.length > 0 &&
    state.flag.length > 0
  );
};

// Définition du composant ChallengeForm
const ChallengeForm: React.FC = () => {
  // Initialisation du state du formulaire avec useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // Initialisation du state des fichiers avec useReducer
  const [fileState, dispatchFile] = useReducer(fileReducer, fileInitialState);

  // Gestion des événements de changement d'input pour le formulaire
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Création de l'action à partir des valeurs de l'input
    const action = {
      type: e.currentTarget.name,
      payload: e.currentTarget.value
    };
    // Dispatch de l'action vers le reducer pour mettre à jour le state du formulaire
    dispatch(action);
  };

  // Gestion des événements de changement de fichier pour le formulaire
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Récupération des fichiers sélectionnés
    const files = e.target.files;
    if (files) {
      // Dispatch de l'action vers le reducer pour mettre à jour le state des fichiers
      dispatchFile({ type: 'upload', payload: files });
    }
  };

  // Gestion des événements de suppression des fichiers sélectionnés pour le formulaire
  const handleFilesClear = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (fileState.files) {
      // Dispatch de l'action vers le reducer pour supprimer les fichiers sélectionnés du state des fichiers
      dispatchFile({ type: 'clear', payload: fileState.files });
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    // Vérifier si le formulaire est valide
    if (!validateForm(state)) {
      // Si non valide, envoyer un message d'erreur
      dispatch({
        type: 'message',
        payload: 'Veuillez remplir tous les champs'
      });
      return;
    }

    // Créer un objet challenge avec les informations du formulaire et les fichiers sélectionnés
    const challenge: FormChallengeProps = {
      ...state,
      resources: fileState.files
    };
    try {
      // Créer un objet FormData pour envoyer les données du formulaire
      const formData = new FormData();

      // Parcourir l'objet challenge et ajouter chaque champ au FormData
      for (const key in challenge) {
        // Si la clé est "resources" et qu'il y a des fichiers sélectionnés, ajouter chaque fichier séparément
        if (key === 'resources' && challenge[key] !== null) {
          for (const file of challenge[key]) {
            formData.append('resources', file as File);
          }
        } else {
          // Sinon, ajouter le champ avec sa clé et sa valeur correspondante
          formData.append(key, (challenge as any)[key]);
        }
      }

      // Envoyer les données du formulaire au backend pour créer un nouvel exercice
      const data = await createOne(formData);

      // Afficher un message de succès avec le titre de l'exercice créé
      dispatch({ type: 'message', payload: `Exercice "${data.title}" créé !` });
      console.log(data);
    } catch (err) {
      // En cas d'erreur, envoyer un message d'erreur
      dispatch({ type: 'message', payload: 'Une erreur est survenue' });
      return;
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold flex justify-center mt-3">
        Création d&apos;un exercice
      </h1>
      {state.message.length > 0 && <p className="text-base">{state.message}</p>}

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
            value={state.points}
          />
        </div>

        <div className="flex w-full justify-center text-center mt-3">
          <div className="m-2">
            <h3 className="text-xl">Description en Markdown</h3>
            <textarea
              className="border-2 border-gray-500 rounded	focus:outline-none"
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
          <InputFile name="files" label="Fichiers" onChange={onChangeFile} />
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
            <Button onClick={handleFilesClear} color="orange" className="mt-8">
              <ArrowPathIcon className="w-5 h-5 mr-1 inline-block" />
              {'Réinitialiser les fichiers'}
            </Button>
          </div>

          <div className="inline-block">
            <Button onClick={handleSubmit} color="green" className="mt-8">
              <PlusIcon className="w-5 h-5 mr-1 inline-block" />
              {'Créer'}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ChallengeForm;
