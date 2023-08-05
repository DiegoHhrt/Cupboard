import { Jwt } from 'jsonwebtoken';
import { User } from 'src/app/interfaces/user.interface';

export interface UserLoginData {
  email: string;
  password: string;
}

//TODO: Extend payload to have custom information
//TODO: verify witch is the correct jwt to use

export interface UserLoginResp {
  ok: boolean;
  uid?: User['id'];
  token?: Jwt;
  msg?: string;
}
