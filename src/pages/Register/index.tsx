import React, { useEffect } from 'react';

const Register: React.FC = () => {
  useEffect(() => {
    document.title = 'Inscription - Battle Judge';
  }, []);

  return (
    <>
      <h1>Inscription</h1>
    </>
  );
};

export default Register;
