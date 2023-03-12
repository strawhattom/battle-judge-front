import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage: React.FC = () => {
  return (
    <>
      <h1 className="text-4xl text-center mt-8 mb-8 font-bold">
        Tableau de bord
      </h1>
      <div className="flex justify-center">
        <Link className="m-3" to="challenges">
          Gérer les exercices
        </Link>
        <Link className="m-3" to="teams">
          Gérer les équipes
        </Link>
      </div>
    </>
  );
};

export default AdminPage;
