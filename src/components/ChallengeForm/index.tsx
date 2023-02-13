import React, { useState, useReducer } from 'react';
import type { FormChallengeProps } from '@/types/ChallengesProps';
import { createOne } from '@/utils/services/challenge.service';
import Input from '@/components/Input';
import './component.css';

interface ChallengeState {
  title: string;
  category: string;
  points: number;
  description: string;
  flag: string;
}

const initialState: ChallengeState = {
  title: '',
  category: '',
  points: 300,
  description: '',
  flag: ''
};

const reducer = (
  state: ChallengeState,
  action: { type: string; payload: string }
) => {
  return { ...state, [action.type]: action.payload };
};

const ChallengeForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const action = {
      type: e.currentTarget.name,
      payload: e.currentTarget.value
    };
    dispatch(action);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const challenge: FormChallengeProps = {
      ...state
    };
    try {
      const data = await createOne(challenge);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Challenge Form</h1>
      <form className="form admin-form" onSubmit={handleSubmit}>
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
        <Input
          type="text"
          name="description"
          label="Description"
          onChange={onChange}
          placeholder="Description de l'exercice"
        />
        <Input
          type="text"
          name="flag"
          label="Flag"
          onChange={onChange}
          placeholder="Flag de l'exercice"
        />
        <button type="submit" className="submit">
          {'Créer'}
        </button>
      </form>
    </>
  );
};

export default ChallengeForm;
