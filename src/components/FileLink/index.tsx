import React from 'react';
import Button from '@/components/Button';
import './components.css';

export interface FileLinkProps {
  file: File;
}

const sendFile = (file: File) => {
  // Trigger download event
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(file);
  link.download = file.name;
  link.click();
};

const showFile = (file: File) => {
  console.log('Showing file', file);
  if (!file) throw new Error('No file defined');
  const reader = new FileReader();
  reader.readAsDataURL(file);
  console.log(reader.result);
};

const FileLink: React.FC<FileLinkProps> = ({ file }) => {
  return (
    <div className="file-container">
      <p
      //   onClick={() => showFile(file)}
      >
        {file.name}
      </p>
      <Button color="blue" type="button" onClick={() => sendFile(file)}>
        Telecharger
      </Button>
    </div>
  );
};

export default FileLink;
