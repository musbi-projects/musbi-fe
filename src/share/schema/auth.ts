import type { ObjectSchema } from 'yup';
import type { JoinForm } from '@/components/modal/JoinModal';
import type { LoginForm } from '@/components/modal/LoginModal/types';

import * as yup from 'yup';

import { usernameRegex, emailRegex, passwordRegex } from '@/share/regex';

export const joinSchema: ObjectSchema<JoinForm> = yup
  .object({
    username: yup.string().min(5).max(16).matches(usernameRegex).required(),
    password: yup.string().matches(passwordRegex).required(),
    passwordCheck: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().required().matches(emailRegex),
  })
  .required();

export const loginSchema: ObjectSchema<LoginForm> = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();
