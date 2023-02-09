import React, { useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import type { FormChallengeProps } from '@/types/ChallengesProps';
import { createOne } from '@/utils/services/challenge.service';

const ChallengeForm: React.FC = () => {
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [points, setPoints] = useState(300);
  const [description, setDescription] = useState('');
  const [flag, setFlag] = useState('');

  const token = localStorage.getItem('jwt');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const challenge: FormChallengeProps = {
      title,
      category,
      points,
      description,
      flag
    };
    try {
      if (!token) return;
      const data = await createOne(challenge);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return !token ? (
    <Navigate to="/" />
  ) : (
    <>
      <h1>Challenge Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          id="category"
          onChange={(e) => setCategory(e.currentTarget.value)}
        />
        <label htmlFor="points">Points</label>
        <input
          type="number"
          name="points"
          id="points"
          defaultValue={300}
          onChange={(e) => setPoints(Number(e.currentTarget.value))}
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
        <label htmlFor="flag">Flag</label>
        <input
          type="text"
          name="flag"
          id="flag"
          onChange={(e) => setFlag(e.currentTarget.value)}
        />
        <button type="submit" className="submit">
          {'Créer'}
        </button>
      </form>
    </>
  );
};

export default ChallengeForm;
