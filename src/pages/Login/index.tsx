import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LeftImage from '@/assets/images/ImageLoginLeft.jpg';
import Logo from '@/assets/images/sopra_steria.png';

const Login: React.FC = () => {
  useEffect(() => {
    document.title = 'Connexion - Battle Judge';
  }, []);
  return (
    <div className="d-flex align-items-center h-100">
      <div className="col-8 d-none d-md-block" style={{ marginRight: '-20%' }}>
        <img
          src={LeftImage}
          alt="Image"
          className="img-fluid"
          style={{ width: '70%' }}
        />
      </div>
      <div className="col-4 mx-auto" style={{ marginBottom: '15%' }}>
        <img src={Logo} alt="Logo" className="img-fluid mb-3" />
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Entrez votre email"
            />
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <button style={{ backgroundColor: '#f67300' }}>Se connecter</button>
          <Link to="/forgot-password" className="btn btn-link btn-block mt-2">
            Mot de passe oublié ?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
