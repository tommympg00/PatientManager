import { AtSymbolIcon, IdentificationIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

import { type Patient } from '@/api';
import { Avatar } from '@/components';

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

  return (
    <div
      className="bg-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="relative h-48">
        <Avatar
          src={patient.documentPhotoPath}
          alt={`${patient.name}'s photo`}
          className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
        />
        {isExpanded && (
          <div className="hidden sm:flex sm:flex-col absolute inset-0 bg-gradient-to-t from-black to-transparent justify-end p-4 transition-opacity duration-300">
            {HIDDEN_FIELDS.map(({ key, icon: Icon }) => (
              <div key={key} className="flex items-center text-white text-wrap">
                <Icon className="h-4 w-4 mr-2" />
                <span className="truncate whitespace-nowrap">{patient[key]}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{patient.name}</h2>
        <p className="text-sm text-gray-600 flex items-center mt-2">
          <IdentificationIcon className="h-4 w-4 mr-2" />
          <span>Patient ID: {patient.id}</span>
        </p>
        <div className="sm:hidden">
          {HIDDEN_FIELDS.map(({ key, icon: Icon }) => (
            <div key={key} className="flex items-center text-gray-600 text-sm">
              <Icon className="h-4 w-4 mr-2" />
              <span>{patient[key]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
