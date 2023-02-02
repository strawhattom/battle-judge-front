import React, { useEffect } from 'react';

const Profile: React.FC = () => {
  useEffect(() => {
    document.title = 'Profil - Battle Judge';
  }, []);

  return (
    <>
      <h1>Profile</h1>
    </>
  );
};

export default Profile;
