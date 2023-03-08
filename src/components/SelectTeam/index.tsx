import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Button, Input } from '@/components';
import { BulkTeams } from '@/types/TeamProps';

type SelectTeamProps = {
  onJoinTeam: (id: number) => void;
  onCreateTeam: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setTeam: (team: string) => void;
  team: string;
  availableTeam: BulkTeams;
};

const SelectTeam: React.FC<SelectTeamProps> = ({
  onJoinTeam,
  onCreateTeam,
  setTeam,
  team,
  availableTeam
}) => {
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
            onChange={(e) => setTeam(e.currentTarget.value)}
            value={team}
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
