import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Patient, PatientsApi } from '@/api';
import { Button, Spinner, Title } from '@/components';
import { QUERY_KEYS } from '@/config';

import { CreatePatientModal, PatientCard } from './components';

export const PatientsScreen = () => {
  const [isCreatePatientModalOpen, setIsCreatePatientModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery<Patient[]>([QUERY_KEYS.patients], PatientsApi.list);

  return (
    <div className="p-6 w-full overflow-y-auto">
      <CreatePatientModal
        show={isCreatePatientModalOpen}
        onClose={() => setIsCreatePatientModalOpen(false)}
      />
      <div className="flex mb-5 items-center">
        <Title className="">Patients</Title>
        <Button className="text-nowrap" onClick={() => setIsCreatePatientModalOpen(true)}>
          Add Patient
        </Button>
      </div>
      {isLoading && (
        <div className="w-full justify-center items-center">
          <Spinner />
        </div>
      )}

      {isError && !isLoading && <p>Error fetching patients.</p>}

      {data?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {data?.map((patient) => <PatientCard key={patient.id} patient={patient} />)}
        </div>
      ) : (
        <p>No patients found.</p>
      )}
    </div>
  );
};
