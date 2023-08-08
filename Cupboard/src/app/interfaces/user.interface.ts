import { ObjectId } from 'mongodb';
import { Household, Inventory, ShoppingList, WishList } from './';

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
