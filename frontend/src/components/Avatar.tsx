import { useState } from "react";

type AvatarProps = {
  imageSrc: string;
  altText: string;
  className?: string;
};

export const Avatar = ({ imageSrc, altText, className = "" }: AvatarProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <img
      src={imgError ? "./vite.svg" : imageSrc}
      alt={altText}
      className={`w-16 h-16 rounded-full border-2 border-primary ${className}`}
      onError={() => setImgError(true)}
    />
  );
};

export default Avatar;
