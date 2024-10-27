import { useState } from 'react';

type PatientCardImageProps = {
  img: string;
  alt: string;
};

export const PatientCardImage = ({ img, alt }: PatientCardImageProps) => {
  const [isError, setIsError] = useState(false);

  return (
    <img
      src={isError ? './placeholder.jpg' : img}
      alt={alt}
      className="object-cover h-full w-full"
      onError={() => setIsError(true)}
    />
  );
};
