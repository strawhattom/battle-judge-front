import { useEffect } from 'react';

function Team() {
    useEffect(() => {
        document.title = 'Equipes - Battle Judge';
    }, []);

    return (
        <>
            <h1>Page des équipes</h1>
        </>
    )
}

export default Team;