import { useEffect } from 'react';

function Register() {
  useEffect(() => {
    document.title = 'Inscription - Battle Judge';
  }, []);

  return (
    <>
      <h1>Page d'inscription</h1>
    </>
  );
}

export default Register;
