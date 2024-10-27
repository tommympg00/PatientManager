export type Patient = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  documentPhotoPath: string;
};

export type CreatePatientPayload = {
  name: string;
  email: string;
  phoneNumber: string;
  documentPhoto: File;
};
