import React from 'react';
import { Button } from '@/components';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

// Les props que le composant prend en entrée
export interface FileLinkProps {
  file: File;
}

// La fonction qui permet de télécharger le fichier
const sendFile = (file: File) => {
  // Crée un élément <a> pour déclencher l'événement de téléchargement
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(file); // Spécifie l'URL du fichier à télécharger
  link.download = file.name; // Spécifie le nom du fichier
  link.click(); // Déclenche le téléchargement
};

// Le composant de lien de fichier
const FileLink: React.FC<FileLinkProps> = ({ file }) => {
  return (
    <div className="flex justify-center items-center space-x-8">
      <p>
        {file.name} {/* Affiche le nom du fichier */}
      </p>
      <Button color="blue" type="button" onClick={() => sendFile(file)}>
        <ArrowDownTrayIcon className="w-5 h-5 mr-1 inline-block" />{' '}
        {/* Icône de téléchargement */}
        Telecharger {/* Texte du bouton */}
      </Button>
    </div>
  );
};

export default FileLink; // Exporte le composant par défaut
