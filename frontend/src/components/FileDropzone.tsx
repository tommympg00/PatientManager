import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { ErrorCode, useDropzone } from 'react-dropzone';

import { cn } from '@/utils';

export type FileDropzoneProps = {
  setUploadedFile: (file: File) => void;
  centerText?: string;
};

export const FileDropzone = ({ setUploadedFile, centerText }: FileDropzoneProps) => {
  const [errorMessage, setErrorMessage] = useState('');

  const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
    },
    onDrop(acceptedFiles) {
      const file = acceptedFiles[0];

      setUploadedFile(file);
    },
    onDropRejected(fileRejections) {
      const errorCode = fileRejections[0].errors[0].code;

      switch (errorCode) {
        case ErrorCode.FileInvalidType:
          setErrorMessage('File must be of type .jpeg');
          break;
        case ErrorCode.FileTooLarge:
          setErrorMessage('The file should not exceed 5MB in size');
          break;
        default:
          setErrorMessage('An error occurred while uploading the file, please try again.');
          break;
      }
    },
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) setUploadedFile(acceptedFiles[0]);
  }, [acceptedFiles, setUploadedFile]);

  return (
    <div
      {...getRootProps()}
      className={cn(
        'mt-5 flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors',
        isDragActive ? 'border-primary bg-primary-100' : 'border-gray-300 bg-white'
      )}
    >
      <input {...getInputProps()} />

      <p className="text-gray-500 text-center">
        {isDragActive
          ? 'Drop the file here...'
          : (centerText ?? 'Drag and drop the file here, or click to browse files')}
      </p>

      <p className="text-sm text-gray-400">Only .jpeg/jpg files will be accepted</p>

      {acceptedFiles.map((file) => (
        <p key={file.name} className="mt-5 text-center text-sm text-gray-500">
          <DocumentTextIcon className="inline-block h-5 w-5" />{' '}
          <span className="font-bold">{file.name}</span> saved
          <br />
        </p>
      ))}

      {fileRejections.length > 0 && (
        <p className="mt-5 text-center text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};
