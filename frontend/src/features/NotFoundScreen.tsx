import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components';
import { BUTTON_VARIANTS } from '@/config';

export const NotFoundScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center border-primary">
        <FaceFrownIcon className="h-30 w-30 text-primary" />
        <p className="text-2xl text-primary mt-5">Page not found.</p>
        <p className="text-gray-500 mt-2">The page you are looking for does not exist.</p>
        <Button className="mt-5" variant={BUTTON_VARIANTS.outline} onClick={() => navigate('/')}>
          Return Home
        </Button>
      </div>
    </div>
  );
};
