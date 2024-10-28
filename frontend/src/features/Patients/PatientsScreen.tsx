import { ExclamationTriangleIcon, PlusIcon, UserIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { Patient, PatientsApi } from '@/api';
import { Button, Spinner, Title } from '@/components';
import { QUERY_KEYS } from '@/config';
import { parseApiError } from '@/utils';

import { CreatePatientModal, PatientCard } from './components';

export const PatientsScreen = () => {
  const [isCreatePatientModalOpen, setIsCreatePatientModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery<Patient[]>(
    [QUERY_KEYS.patients],
    PatientsApi.list,
    {
      onError: (error) => {
        toast.error(parseApiError(error));
      },
    }
  );

  return (
    <div className="p-6 w-full overflow-y-auto">
      <CreatePatientModal
        show={isCreatePatientModalOpen}
        onClose={() => setIsCreatePatientModalOpen(false)}
      />
      <div className="flex mb-5 items-center">
        <Title className="">Patients</Title>
        <Button
          className="text-nowrap"
          onClick={() => setIsCreatePatientModalOpen(true)}
          icon={<PlusIcon className="w-4 h-4" />}
        >
          Add Patient
        </Button>
      </div>

      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Spinner size="xl" />
            <p className="text-2xl text-primary mt-5">Loading...</p>
            <p className="text-gray-500 mt-2">Please wait while we load the content for you.</p>
          </div>
        </div>
      )}

      {isError && !isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col items-center">
            <ExclamationTriangleIcon className="h-16 w-16 text-danger" />
            <p className="text-2xl text-red-600 mt-5">Error</p>
            <p className="text-gray-500 mt-2">
              There was an error fetching the data. Please try again.
            </p>
          </div>
        </div>
      )}

      {data?.length && !isError ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {data?.map((patient) => <PatientCard key={patient.id} patient={patient} />)}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <UserIcon className="h-16 w-16 text-gray-400" />
          <p className="text-2xl text-gray-600 mt-4">No patients found</p>
          <p className="text-gray-500 mt-2">Please check back later or add new patients.</p>
        </div>
      )}
    </div>
  );
};
