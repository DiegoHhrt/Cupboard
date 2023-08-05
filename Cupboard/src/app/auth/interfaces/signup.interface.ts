import { Jwt } from 'jsonwebtoken';
import { User } from 'src/app/interfaces/user.interface';

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  userName: string;
  budget?: number;
}

export interface SignUpResp {
  ok: boolean;
  uid?: User['id'];
  token?: Jwt;
  msg?: string;
}
