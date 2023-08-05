import { Jwt } from 'jsonwebtoken';
import { User } from 'src/app/interfaces/user.interface';

export interface TokenRenewResp {
  ok: boolean;
  uid?: User['id'];
  userName?: User['userName'];
  email?: User['email'];
  token?: Jwt;
}
