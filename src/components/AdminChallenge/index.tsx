import React, { useEffect, useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useLoaderData
} from 'react-router-dom';
import type { ChallengesStateObject } from '@/types/ChallengeProps';
import { Container, InlineChallengeLayout, Button } from '@/components';
import { loadChallenges } from '@/utils/services/challenge.service';
import { useAuth } from '@/contexts/AuthContext';
import { PlusIcon } from '@heroicons/react/24/outline';

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
    <Container cols={1}>
      {pathname === '/admin/challenges' ? (
        <>
          <div className="flex justify-end mx-10 mt-2">
            <Button onClick={handleCreateButton} color="green" className="mt-8">
              <PlusIcon className="w-5 h-5 mr-1 inline-block" />
              {'Créer un challenge'}
            </Button>
          </div>

          <div className="w-4/5 mx-10">
            <h2 className="text-xl font-bold mb-4">Active challenges</h2>

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

            <h2 className="text-xl font-bold mb-4">Inactive challenges</h2>
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
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </Container>
  );
};

export default AdminChallengePage;
