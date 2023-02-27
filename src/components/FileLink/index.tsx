import React from 'react';
import { Button } from '@/components';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

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
    <div className="flex justify-center items-center space-x-8">
      <p
      //   onClick={() => showFile(file)}
      >
        {file.name}
      </p>
      <Button color="blue" type="button" onClick={() => sendFile(file)}>
        <ArrowDownTrayIcon className="w-5 h-5 mr-1 inline-block" />
        Telecharger
      </Button>
    </div>
  );
};

export default FileLink;
