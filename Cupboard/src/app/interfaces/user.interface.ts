import { ObjectId } from 'mongodb';
import { Household, Inventory, ShoppingList, WishList } from './';
import { AuthErrors, UpdateErrors } from '../auth/interfaces';

export interface User {
  id: ObjectId;
  name?: string;
  userName: string;
  email?: string;
  password?: string;
  household?: Household['id'];
  shoppingList?: ShoppingList['id'];
  inventory?: Inventory['id'];
  wishList?: WishList['id'];
  budget?: number;
  status?: boolean;
}

export interface UserInfoData {
  name?: string;
  userName?: string;
  email?: string;
  password?: string;
  budget?: number;
}

export interface UserInfoResponse {
  ok: boolean;
  user?: User;
  msg?: string;
  errors?: AuthErrors;
}
