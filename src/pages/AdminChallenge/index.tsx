import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import type { InlineChallengeLayoutProps } from '@/types/InlineChallengeLayoutProps';
import type { ChallengesProps } from '@/types/ChallengesProps';
import InlineChallengeLayout from '@/components/InlineChallengeLayout';
import { loadChallenges } from './challenge';

const ChallengeState: ChallengesProps = [];

const AdminChallengePage: React.FC = () => {
  const [challenges, setChallenges] = useState<ChallengesProps>(ChallengeState);
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
      <h1>Admin challenge</h1>
      {challenges.map(({ title, category, points, active }, index) => (
        <InlineChallengeLayout
          key={index}
          title={title}
          category={category}
          points={points}
          active={active}
        />
      ))}
    </>
  );
};

export default AdminChallengePage;
