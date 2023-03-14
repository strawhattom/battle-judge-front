import React, { useReducer } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import type {
  ChallengeProps,
  FormChallengeProps
} from '@/types/ChallengeProps';
import { editOne } from '@/utils/services/challenge.service';
import ReactMd from 'react-markdown';
import { Input, InputFile, Button, FileLink } from '@/components';
import { ArrowPathIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

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
  files: FileList | File[];
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
  files: [],
  isFilePicked: false
};

// La fonction reducer sert à mettre à jour le state du formulaire.
const reducer = (
  state: ChallengeState, // L'état actuel du formulaire
  action: { type: string; payload: string } // La nouvelle action à exécuter
) => {
  // Si l'action est 'points', on met à jour les points du formulaire avec le nouveau payload.
  if (action.type === 'points')
    return { ...state, points: Number(action.payload) };
  // Sinon, on met à jour le state avec le champ concerné et sa nouvelle valeur.
  return { ...state, [action.type]: action.payload };
};

// La fonction fileReducer sert à mettre à jour le state des fichiers sélectionnés pour le formulaire.
const fileReducer = (
  state: FileState, // L'état actuel des fichiers sélectionnés
  action: { type: string; payload: FileList | File[] } // La nouvelle action à exécuter
) => {
  switch (action.type) {
    // Si l'action est 'upload', on met à jour les fichiers avec les nouveaux fichiers sélectionnés et on met à jour le booléen isFilePicked à true.
    case 'upload':
      return {
        ...state,
        files: action.payload,
        isFilePicked: true
      };
    // Si l'action est 'clear', on efface les fichiers sélectionnés et on met à jour le booléen isFilePicked à false.
    case 'clear':
      return {
        ...state,
        files: [],
        isFilePicked: false
      };
    // Si l'action est 'error', on met à jour l'erreur à afficher pour les fichiers sélectionnés.
    case 'error':
      return {
        ...state,
        error: action.payload
      };
    // Par défaut, on ne modifie pas le state.
    default:
      return state;
  }
};

// La fonction validateForm sert à vérifier que tous les champs obligatoires du formulaire sont remplis.
const validateForm = (state: ChallengeState) => {
  return (
    state.title.length > 0 && // Titre non vide
    state.category.length > 0 && // Catégorie non vide
    state.points > 0 && // Points positifs
    state.description.length > 0 && // Description non vide
    state.flag.length > 0 // Flag non vide
  );
};

// Le composant ChallengeForm est un formulaire permettant d'éditer un challenge.
const ChallengeForm: React.FC = () => {
  // On récupère les données du challenge à éditer.
  const data = useLoaderData() as ChallengeProps;
  // On récupère la fonction navigate pour pouvoir rediriger l'utilisateur si nécessaire.
  const navigate = useNavigate();
  // On utilise useReducer pour gérer l'état du formulaire.
  const [state, dispatch] = useReducer(reducer, initialState);
  // On utilise useReducer pour gérer l'état des fichiers sélectionnés.
  const [fileState, dispatchFile] = useReducer(fileReducer, fileInitialState);

  React.useEffect(() => {
    // Si on a pas de données, on redirige vers la page des challenges
    if (!data) return navigate('/admin/challenges');
    const { id, title, category, points, description, flag } = data;
    dispatch({ type: 'id', payload: id.toString() });
    dispatch({ type: 'title', payload: title });
    dispatch({ type: 'category', payload: category });
    dispatch({ type: 'points', payload: points.toString() });
    dispatch({ type: 'description', payload: description });
    dispatch({ type: 'flag', payload: flag });

    if (!data.resources || data.resources.length === 0) return;

    // Transforme les ressources en File pour pouvoir les afficher dans l'interface
    const files: File[] = [];
    for (const resource of data.resources) {
      const { buffer, originalname, mimetype } = resource;
      const arrayBuffer = new Uint8Array(
        (buffer as unknown as { data: Array<number> }).data
      );
      const file = new File([arrayBuffer], originalname, { type: mimetype });
      files.push(file);
    }
    dispatchFile({ type: 'upload', payload: files });
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

    // Vérifie que le formulaire est valide, sinon affiche une erreur
    if (!validateForm(state)) {
      dispatch({ type: 'error', payload: 'Veuillez remplir tous les champs' });
      return;
    }

    // Crée un objet challenge à partir des états de l'application et des fichiers uploadés
    const challenge: FormChallengeProps = {
      ...state,
      resources: fileState.files
    };

    console.log(challenge['resources']);

    try {
      // Crée un objet FormData pour envoyer les données à l'API
      const formData = new FormData();

      // Parcourt les propriétés de l'objet challenge
      for (const key in challenge) {
        // Si la propriété est "resources" et qu'il y a des fichiers uploadés, les ajoute à FormData
        if (key === 'resources' && challenge[key] !== null) {
          for (const file of challenge[key]) {
            formData.append('resources', file as File);
          }
        } else {
          // Sinon, ajoute la propriété à FormData
          formData.append(key, (challenge as any)[key]);
        }
      }
      console.log(formData);

      // Envoie les données à l'API pour éditer le challenge
      const data = await editOne(state.id, formData);
      console.log(data);
    } catch (err) {
      // En cas d'erreur, affiche l'erreur dans la console
      console.error(err);
      return;
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold flex justify-center mt-3">
        Édition de l&apos;exercice {state.title}
      </h1>
      {state.error.length > 0 && <p className="text-base">{state.error}</p>}
      <form className="flex flex-col justify-center items-center mt-4">
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

        <div className="flex w-full justify-center text-center mt-3">
          <div className="m-2">
            <h3 className="text-xl">Description en Markdown</h3>
            <textarea
              className="border-2 border-gray-500 rounded	focus:outline-none"
              name="description"
              id="description"
              value={state.description}
              onChange={onChange}
              placeholder="Description de l'exercice"
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
            value={state.flag}
            placeholder="Flag de l'exercice"
          />
        </div>

        <div className="w-96">
          <InputFile name="files" label="Fichiers" onChange={onChangeFile} />
          {fileState.files &&
            fileState.files.length > 0 &&
            Array.from(fileState.files).map((file, index) => (
              <FileLink key={index} file={file} />
            ))}
        </div>
        <div className="w-96 flex justify-between items-center">
          <Button onClick={handleFilesClear} color="orange" className="my-4">
            <ArrowPathIcon className="w-5 h-5 mr-1 inline-block" />
            {'Réinitialiser les fichiers'}
          </Button>
          <Button
            color="green"
            type="submit"
            onClick={handleSubmit}
            className="my-4"
          >
            <PencilSquareIcon className="w-5 h-5 mr-1 inline-block" />
            {'Éditer'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default ChallengeForm;
