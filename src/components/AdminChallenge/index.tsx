import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import type { ChallengesStateObject } from '@/types/ChallengesProps';
import InlineChallengeLayout from '@/components/InlineChallengeLayout';
import { loadChallenges } from '@/utils/services/challenge.service';
import { useAuth } from '@/contexts/AuthContext';
import { PlusIcon } from '@heroicons/react/24/outline';

const ChallengeState: ChallengesStateObject = {
  active: [],
  inactive: []
};

const AdminChallengePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [challenges, setChallenges] =
    useState<ChallengesStateObject>(ChallengeState);

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
          <div className="flex justify-end mx-10 mt-2">
            <button
              type="button"
              onClick={handleCreateButton}
              className="bg-zinc-200 hover:bg-zinc-300 text-black  py-2 px-4 mt-8 rounded"
            >
              <PlusIcon className="w-5 h-5 mr-1 inline-block" />
              {'Créer un challenge'}
            </button>
          </div>

          <div className="mx-10">
            <h2 className="text-xl font-bold">Active challenges</h2>

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

            <h2 className="text-xl font-bold">Inactive challenges</h2>
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
        <>
          <Outlet />
        </>
      )}
    </>
  );
};

export default AdminChallengePage;
