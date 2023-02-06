import React, { useEffect } from 'react';

const AdminPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Admin - Battle Judge';
  }, []);
  return (
    <>
      <h1>Admin</h1>
    </>
  );
};

export default AdminPage;
