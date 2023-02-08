import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import type { ChallengesStateObject } from '@/types/ChallengesProps';
import InlineChallengeLayout from '@/components/InlineChallengeLayout';
import { loadChallenges } from '@/utils/services/challenge.service';

const ChallengeState: ChallengesStateObject = {
  active: [],
  inactive: []
};

const AdminChallengePage: React.FC = () => {
  const [challenges, setChallenges] =
    useState<ChallengesStateObject>(ChallengeState);
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    const load = async () => {
      try {
        if (!token) return;
        const data = await loadChallenges();
        setChallenges(data);
      } catch (err) {
        console.log(err);
      }
    };
    load();
  }, []);

  return !token ? (
    <Navigate to="/" />
  ) : (
    <>
      <h1>Battle</h1>
      <h2>Active challenges</h2>
      {challenges.active.map(
        ({ id, title, category, points, active }, index) => (
          <InlineChallengeLayout
            id={id}
            key={index}
            title={title}
            category={category}
            points={points}
            active={active}
          />
        )
      )}

      <h2>Inactive challenges</h2>
      {challenges.inactive.map(
        ({ id, title, category, points, active }, index) => (
          <InlineChallengeLayout
            id={id}
            key={index}
            title={title}
            category={category}
            points={points}
            active={active}
          />
        )
      )}
    </>
  );
};

export default AdminChallengePage;
