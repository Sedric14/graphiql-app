import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormReset } from 'react-hook-form';

export interface Sign {
  email: string;
  password: string;
  repeatPassword: string;
}

export interface RefTypes {
  register: UseFormRegister<Sign>;
  handleSubmit: UseFormHandleSubmit<Sign>;
  errors: FieldErrors<Sign>;
  reset: UseFormReset<Sign>;
}
