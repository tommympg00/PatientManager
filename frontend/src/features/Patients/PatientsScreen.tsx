import { useQuery } from '@tanstack/react-query';

import { Patient, PatientsApi } from '@/api';
import { QUERY_KEYS } from '@/config';

import PatientCard from './PatientCard';

export const PatientsScreen = () => {
  const fetchPatients = async () => {
    const { data } = await PatientsApi.list();

    return data;
  };

  const { data, isLoading, isError } = useQuery<Patient[]>([QUERY_KEYS.patients], fetchPatients);

  if (isLoading) return <p>Loading patients...</p>;

  if (isError) return <p>Error fetching patients.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Patients</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((patient) => <PatientCard key={patient.id} patient={patient} />)}
      </div>
    </div>
  );
};

export default PatientsScreen;
