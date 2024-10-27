import { ClipboardIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { AtSymbolIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { type Patient } from '@/api';
import { Button, Subtitle } from '@/components';
import { cn } from '@/utils';

import { PatientCardImage } from '..';

type PatientCardProps = {
  patient: Patient;
};

type HiddenField = {
  key: keyof Patient;
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
};

const HIDDEN_FIELDS: HiddenField[] = [
  {
    key: 'email',
    icon: AtSymbolIcon,
  },
  {
    key: 'phoneNumber',
    icon: PhoneIcon,
  },
];

export const PatientCard = ({ patient }: PatientCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  const copyToClipboard = () => {
    const textToCopy = `Email: ${patient.email}\nPhone: ${patient.phoneNumber}`;
    navigator.clipboard.writeText(textToCopy);
    toast.success('Patient info copied to clipboard');
  };

  return (
    <div className="relative flex flex-col border border-gray-200 rounded-lg overflow-hidden duration-300 hover:shadow-lg">
      <div className="relative flex justify-center items-center h-40 overflow-hidden">
        <PatientCardImage
          img={patient.documentPhotoPath}
          alt={`Patient ${patient.name} document`}
        />
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4 space-y-2 transition-all duration-300 ease-in-out',
            isExpanded ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'
          )}
        >
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              {HIDDEN_FIELDS.map(({ key, icon: Icon }) => (
                <div key={key} className="flex items-center gap-1 max-w-52">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm text-gray-500 truncate overflow-hidden">
                    {patient[key]}
                  </span>
                </div>
              ))}
            </div>
            <Button
              className="ml-auto pr-2 py-0"
              variant="outline"
              onClick={copyToClipboard}
              aria-label="Copy patient contact info to clipboard"
            >
              <ClipboardIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center p-2">
        <Subtitle>{patient.name}</Subtitle>
        <Button className="ml-auto" variant="outline" onClick={toggleExpanded}>
          {isExpanded ? (
            <XMarkIcon className="w-4 h-4" />
          ) : (
            <InformationCircleIcon className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
};
