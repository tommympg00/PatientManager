import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { CreatePatientPayload, PatientsApi } from '@/api';
import { Button, FileDropzone, Input, Modal } from '@/components';
import { BUTTON_VARIANTS } from '@/config';
import { CreatePatientFormSchema, createPatientFormSchema } from '@/types';
import { parseApiError } from '@/utils';

type CreatePatientModalProps = {
  show: boolean;
  onClose: () => void;
};

export const CreatePatientModal = ({ show, onClose }: CreatePatientModalProps) => {
  const handleClose = () => {
    setTimeout(() => {
      reset({
        name: '',
        email: '',
        phone: { countryCode: '', number: '' },
        documentPhoto: undefined,
      });
    }, 300);
    onClose();
  };

  const onSubmit = (data: CreatePatientFormSchema) => {
    const payload: CreatePatientPayload = {
      ...data,
      phoneNumber: `${data.phone.countryCode}${data.phone.number}`,
    };

    mutate(payload);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: CreatePatientPayload) => {
      return PatientsApi.create(data);
    },
    onSuccess: (data) => {
      toast.success(`Patient ${data.name} created successfully`);
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      localStorage.setItem('users', JSON.stringify([...users, data]));
      handleClose();
    },
    onError: (error) => {
      toast.error(parseApiError(error));
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreatePatientFormSchema>({
    resolver: zodResolver(createPatientFormSchema),
    mode: 'onSubmit',
  });

  const modalContent = (
    <div className="p-6 space-y-4">
      <Input id="name" label="Name" placeholder="John Doe" {...register('name')} errors={errors} />
      <Input
        id="email"
        label="Email"
        placeholder="jhonDoe@email.com"
        errors={errors}
        {...register('email')}
      />
      <div className="flex gap-2 mb-0">
        <Input
          id="phone.countryCode"
          label="Country Code"
          placeholder="+598"
          containerClassName="w-2/5 sm:w-1/4 mb-0"
          {...register('phone.countryCode')}
          errors={errors}
        />
        <Input
          id="phone.number"
          label="Phone Number"
          placeholder="99749722"
          containerClassName="w-3/5 sm:w-3/4 mb-0"
          errors={errors}
          {...register('phone.number')}
        />
      </div>
      <span className="w-full text-sm text-gray-400">Enter country code in the format +1</span>

      <FileDropzone
        setUploadedFile={(file) => setValue('documentPhoto', file)}
        centerText="Drag and drop the Patient document here, or click to browse files"
      />
    </div>
  );

  const modalFooter = (
    <div className="px-6 flex w-full justify-between">
      <Button onClick={handleClose} variant={BUTTON_VARIANTS.outline}>
        Close
      </Button>
      <Button
        onClick={handleSubmit(onSubmit)}
        loading={isLoading}
        variant={BUTTON_VARIANTS.primary}
      >
        Add
      </Button>
    </div>
  );

  return (
    <Modal
      show={show}
      onClose={handleClose}
      header="Add Patient"
      content={modalContent}
      footer={modalFooter}
    />
  );
};
