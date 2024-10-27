import { api, ENDPOINTS, Response } from '..';
import { CreatePatientPayload, Patient } from './responses';

const transformCreatePatientPayload = (payload: CreatePatientPayload) => {
  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('email', payload.email);
  formData.append('phoneNumber', payload.phoneNumber);
  formData.append('document_photo', payload.documentPhoto);

  return formData;
};

export const PatientsApi = {
  list: async () => {
    const { data } = await api.get<Response<Patient[]>>(ENDPOINTS.patients.base);

    return data.data;
  },
  create: async (payload: CreatePatientPayload) => {
    const transformedPayload = transformCreatePatientPayload(payload);
    const { data } = await api.post<Response<Patient>>(
      ENDPOINTS.patients.base,
      transformedPayload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return data.data;
  },
};
