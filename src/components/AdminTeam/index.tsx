import React, { useState, useEffect } from 'react';
import { loadTeams } from '@/utils/services/admin.service';
import { useLoaderData } from 'react-router-dom';
import type { BulkTeams } from '@/types/TeamProps';
import Button from '@/components/Button';
import Container from '@/components/Container';

export const loader = async () => {
  const teams = await loadTeams();
  return teams;
};

const AdminTeam: React.FC = () => {
  const data = useLoaderData() as BulkTeams;
  const [teams, setTeams] = useState<BulkTeams>(data);

  return (
    <Container cols={1}>
      <p className="text-xl mt-8">Teams</p>
      {!teams ? (
        <p> {"Pas d'équipe"} </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Taille</th>
              <th></th>
              <th></th>
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
    </Container>
  );
};

export default AdminTeam;
