import { useEffect } from 'react';

function Home() {

    // Changement du titre de la page (onglet)
    // lancé qu'une seule fois grâce au tableau* de dépendence vide (deuxième paramètre de la fonction)
    useEffect(() => {
        document.title = 'Accueil - Battle Judge';
    }, []); // <-- * ce tableau là

    return (
        <>
            <h1> Page d'accueil </h1>
        </>
    )
}

export default Home;