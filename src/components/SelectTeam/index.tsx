import React, { useEffect, useCallback } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Button, Input } from '@/components';
import { BulkTeams } from '@/types/TeamProps';
import { useAuth } from '@/contexts/AuthContext';
import { getTeams, createTeam, joinTeam } from '@/utils/services/user.service';
import { UserTeamProps } from '@/types/UserProps';

const SelectTeam: React.FC = () => {
  const { user } = useAuth();
  const [currentTeam, setCurrentTeam] = React.useState<UserTeamProps>(null);
  const [availableTeam, setAvailableTeam] = React.useState<BulkTeams>([]);
  const [newTeam, setNewTeam] = React.useState<string>('');

  const onCreateTeam = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const created = await createTeam(newTeam);
    if (created) {
      loadTeams();
    }
  };

  const onJoinTeam = async (id: number) => {
    const [joined, data] = await joinTeam(id);
    if (joined && data) {
      setCurrentTeam(data.team);
    }
  };

  const loadTeams = useCallback(async () => {
    const teams = await getTeams();
    setAvailableTeam(teams);
  }, []);

  useEffect(() => {
    if (!user?.team) {
      loadTeams();
    }
  }, []);

  return (
    <>
      <h2 className="text-xl font-bold text-center text-red-500">
        <ExclamationTriangleIcon className="w-5 h-5 mr-1 inline-block text-red-500" />
        {"Tu n'as pas d'équipe !"}
      </h2>
      <div className="bg-gray-200 w-9/12 p-8 ml-auto mr-auto mb-16 rounded-xl">
        <table className="ml-auto mr-auto w-4/5 text-center">
          <thead>
            <tr className="h-12 border-b border-black">
              <th>{"Nom de l'équipe"}</th>
              <th>{'Taille'}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {availableTeam.map((team, index) => (
              <tr key={index} className="h-12 border-b border-black">
                <td>{team.name}</td>
                <td>{team.members}</td>
                <td>
                  <Button onClick={() => onJoinTeam(team.id)} color="orange">
                    {'Rejoindre'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="text-xl font-bold text-center">Créer une équipe</h2>
      <div className="flex justify-center">
        <div className="flex flex-col items-center bg-gray-200 mb-8 pt-4 pb-4 rounded-xl px-4">
          <Input
            type="text"
            name="Nom d'équipe"
            label="Nom d'équipe"
            onChange={(e) => setNewTeam(e.currentTarget.value)}
            value={newTeam}
            placeholder="Nom d'équipe"
          />
          <div className="profile-create-btn">
            <Button onClick={onCreateTeam} color="green">
              {'Créer une équipe'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectTeam;
