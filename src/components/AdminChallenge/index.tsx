import React, { useEffect, useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useLoaderData
} from 'react-router-dom';
import type { ChallengesStateObject } from '@/types/ChallengesProps';
import InlineChallengeLayout from '@/components/InlineChallengeLayout';
import { loadChallenges } from '@/utils/services/challenge.service';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Button';

const ChallengeState: ChallengesStateObject = {
  active: [],
  inactive: []
};

export const loader = async () => {
  try {
    const data = await loadChallenges();
    return data;
  } catch (err) {
    console.log(err);
    return ChallengeState;
  }
};

const AdminChallengePage: React.FC = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as ChallengesStateObject;
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [challenges, setChallenges] = useState<ChallengesStateObject>(data);

  const handleCreateButton = () => {
    navigate('/admin/challenges/create');
  };

  useEffect(() => {
    const load = async () => {
      try {
        if (!user) return;
        const data = await loadChallenges();
        setChallenges(data);
      } catch (err) {
        console.log(err);
      }
    };
    load();
  }, []);

  return (
    <>
      {pathname === '/admin/challenges' ? (
        <>
          <Button type="button" color="green" onClick={handleCreateButton}>
            {'Créer un nouveau'}
          </Button>
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
      ) : (
        <>
          <Outlet />
        </>
      )}
    </>
  );
};

export default AdminChallengePage;
