import React, { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = 'Admin - Battle Judge';
  }, []);
  return (
    <>
      <h1>Admin page</h1>
      {pathname === '/admin' ? (
        <>
          <Link to="/admin">Tableau</Link>
          <Link to="/admin/challenges">Challenges</Link>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default AdminPage;
