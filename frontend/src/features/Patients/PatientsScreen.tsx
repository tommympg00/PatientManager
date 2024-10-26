import { useQuery } from '@tanstack/react-query';

import { Patient, PatientsApi } from '@/api';
import { Button, Spinner, Title } from '@/components';
import { QUERY_KEYS } from '@/config';

import { PatientCard } from './PatientCard';

export const PatientsScreen = () => {
  const fetchPatients = async () => {
    const { data } = await PatientsApi.list();

    return data;
  };

  const { data, isLoading, isError } = useQuery<Patient[]>([QUERY_KEYS.patients], fetchPatients);

  return (
    <div className="p-6 w-full overflow-y-auto">
      <div className="flex mb-5 items-center">
        <Title className="">Patients</Title>
        <Button className="text-nowrap">Add Patient</Button>
      </div>
      {isLoading && (
        <div className="w-full justify-center items-center">
          <Spinner />
        </div>
      )}

      {isError && <p>Error fetching patients.</p>}

      {data?.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {data?.map((patient) => <PatientCard key={patient.id} patient={patient} />)}
        </div>
      )}
    </div>
  );
};
