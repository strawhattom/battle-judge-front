import { useEffect } from 'react';

function Login() {
  useEffect(() => {
    document.title = 'Connexion - Battle Judge';
  }, []);

  return (
    <>
      <h1> Page de connexion </h1>
    </>
  );
}

export default Login;
