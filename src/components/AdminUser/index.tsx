import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { loadUsers } from '@/utils/services/admin.service';
import type { BulkUsers } from '@/types/UserProps';

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
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                {Object.values(user).map((value) => (
                  <td key={value}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AdminUser;
