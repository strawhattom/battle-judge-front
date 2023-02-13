import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage: React.FC = () => {
  return (
    <>
      <h1>Tableau de bord</h1>
      <Link to="challenges">Gérer les exercices</Link>
      <Link to="teams">Gérer les équipes</Link>
    </>
  );
};

export default AdminPage;
