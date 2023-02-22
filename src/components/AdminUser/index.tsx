import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { loadUsers } from '@/utils/services/admin.service';
import type { BulkUsers, UserTeamProps } from '@/types/UserProps';
import Button from '@/components/Button';

export const loader = async () => {
  return await loadUsers();
};

const AdminUser: React.FC = () => {
  const data = useLoaderData() as BulkUsers;
  const [users, setUsers] = useState<BulkUsers>(data);

  return (
    <>
      <h1>Users</h1>
      {!users ? (
        <p> {"Pas d'utilisateur"} </p>
      ) : (
        <table>
          <thead>
            <tr>
              {Object.keys(users[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
              <th> Modifier </th>
              <th> Supprimer </th>
            </tr>
          </thead>
          <tbody>
            {users.map(
              (
                user // each user
              ) => (
                <tr key={user.id}>
                  {Object.values(user).map(
                    (value: number | string | UserTeamProps) => {
                      // each value of the user
                      if (value && typeof value === 'object') {
                        return <td key={value.id}>{value.name}</td>;
                      } else {
                        return <td key={value}>{value}</td>;
                      }
                    }
                  )}
                  <td>
                    {' '}
                    <Button
                      color="orange"
                      type="button"
                      onClick={() => {
                        console.log('Edit user', user.id);
                      }}
                    >
                      {' '}
                      Modifier{' '}
                    </Button>{' '}
                  </td>
                  <td>
                    {' '}
                    <Button
                      color="red"
                      type="button"
                      onClick={() => {
                        console.log('Supprimer user', user.id);
                      }}
                    >
                      {' '}
                      Supprimer{' '}
                    </Button>{' '}
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

export default AdminUser;
