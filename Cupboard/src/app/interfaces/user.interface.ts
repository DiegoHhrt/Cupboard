import { ObjectId } from 'mongodb';
import { Household } from './household.interface';
import { Inventory, ShoppingList, WishList } from './list.interface';

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
