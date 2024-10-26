import { useState } from 'react';

import { cn } from '@/utils';

type AvatarProps = {
  src: string;
  alt: string;
  className?: string;
};

export const Avatar = ({ src, alt, className = '' }: AvatarProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <img
      src={imgError ? './placeholder.jpg' : src}
      alt={alt}
      className={cn(
        'w-full h-full object-cover transition-opacity duration-300 ease-in-out hover:opacity-75',
        className
      )}
      onError={() => setImgError(true)}
    />
  );
};

export default Avatar;
