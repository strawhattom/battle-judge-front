import React, { useState, useEffect } from 'react';
import {
  useLoaderData,
  useNavigate,
  Outlet,
  useLocation
} from 'react-router-dom';
import { loadUsers } from '@/utils/services/admin.service';
import type { BulkUsers, UserTeamProps } from '@/types/UserProps';
import Button from '@/components/Button';
import Container from '@/components/Container';

export const loader = async () => {
  return await loadUsers();
};

const AdminUser: React.FC = () => {
  const data = useLoaderData() as BulkUsers;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [users, setUsers] = useState<BulkUsers>(data);

  if (pathname !== '/admin/users') {
    return (
      <Container cols={1}>
        {' '}
        <Outlet />{' '}
      </Container>
    );
  }

  return (
    <Container cols={1}>
      <p className="text-xl mt-8">Users</p>
      {!users ? (
        <p> {"Pas d'utilisateur"} </p>
      ) : (
        <table className="table-auto">
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
                        navigate(`/admin/users/edit/${user.id}`);
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
    </Container>
  );
};

export default AdminUser;
