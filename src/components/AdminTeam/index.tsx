import React, { useState, useEffect } from 'react';
import { loadTeams } from '@/utils/services/admin.service';
import { useLoaderData } from 'react-router-dom';
import type { BulkTeams } from '@/types/TeamProps';
import Button from '@/components/Button';

export const loader = async () => {
  const teams = await loadTeams();
  return teams;
};

const AdminTeam: React.FC = () => {
  const data = useLoaderData() as BulkTeams;
  const [teams, setTeams] = useState<BulkTeams>(data);

  return (
    <>
      <h1>Teams</h1>
      {!teams ? (
        <p> {"Pas d'équipe"} </p>
      ) : (
        <table>
          <thead>
            <tr>
              {Object.keys(teams[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
              <th> Modifier </th>
              <th> Supprimer </th>
            </tr>
          </thead>
          <tbody>
            {teams.map(
              (
                team // each team
              ) => (
                <tr key={team.id}>
                  {Object.values(team).map((value: number | string) => {
                    // each value of the team
                    return <td key={value}>{value}</td>;
                  })}
                  <td>
                    <Button
                      color="orange"
                      type="button"
                      onClick={() => {
                        console.log('Edit team', team.id);
                      }}
                    >
                      Modifier
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="red"
                      type="button"
                      onClick={() => {
                        console.log('Delete team', team.id);
                      }}
                    >
                      Supprimer
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AdminTeam;
