import { useEffect } from 'react';

function Profile() {
    useEffect(() => {
        document.title = 'Profil - Battle Judge';
    }, []);

    return (
        <>
            <h1> Page de profile </h1>
        </>
    )
}

export default Profile;