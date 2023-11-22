import { UpdateErrors } from 'src/app/auth/interfaces';
import { User } from 'src/app/interfaces/user.interface';

export interface UserUpdateData {
  name?: string;
  userName?: string;
  email?: string;
  password?: string;
  budget?: number;
}

export interface UserUpdateResp {
  ok: boolean;
  user?: User;
  msg?: string;
  errors?: UpdateErrors;
}
