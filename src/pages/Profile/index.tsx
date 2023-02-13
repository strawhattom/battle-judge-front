import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Button';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUpdate = () => {
    console.log('update');
  };

  React.useEffect(() => {
    console.log(user);
  }, []);

  return (
    <>
      <h1>Profil</h1>
      <Button type="button" color="orange" onClick={handleUpdate}>
        Update
      </Button>
      <Button type="button" color="red" onClick={handleLogout}>
        Deconnexion
      </Button>
    </>
  );
};

export default Profile;
