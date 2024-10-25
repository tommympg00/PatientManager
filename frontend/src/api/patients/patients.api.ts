import { api, ENDPOINTS, Response } from "..";
import { Patient } from "./responses";

export const PatientsApi = {
  list: async () => {
    const { data } = await api.get<Response<Patient[]>>(
      ENDPOINTS.patients.base
    );
    return data;
  },
};
