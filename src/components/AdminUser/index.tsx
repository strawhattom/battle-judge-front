import React, { useState } from 'react';
import {
  useLoaderData,
  useNavigate,
  Outlet,
  useLocation,
  useRevalidator
} from 'react-router-dom';
import { loadUsers, deleteOne } from '@/utils/services/admin.service';
import type { BulkUsers, UserTeamProps } from '@/types/UserProps';
import Button from '@/components/Button';
import Container from '@/components/Container';

export const loader = async () => {
  return await loadUsers();
};

const AdminUser: React.FC = () => {
  const users = useLoaderData() as BulkUsers;
  const navigate = useNavigate();
  // const revalidator = useRevalidator();
  const { pathname } = useLocation();

  const onDelete = async (id: number) => {
    const deleted = await deleteOne(id);
    if (deleted) {
      navigate(0);
    }
  };

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
              <th> # </th>
              <th> Nom </th>
              <th> Email </th>
              <th> Role </th>
              <th> Team </th>
              <th></th>
              <th></th>
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
                        onDelete(user.id);
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
