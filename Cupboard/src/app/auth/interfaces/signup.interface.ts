import { Jwt } from 'jsonwebtoken';
import { User } from 'src/app/interfaces';
import { Errors } from './';

export interface UserSignUpData {
  email: string;
  password: string;
  name: string;
  userName: string;
  budget?: number;
}

export interface UserSignUpResp {
  ok: boolean;
  uid?: User['id'];
  // token?: Jwt;
  token?: string;
  msg?: string;
  errors?: Errors;
}
