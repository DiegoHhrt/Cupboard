import { ObjectId } from 'mongodb';
import { User } from './user.interface';
import { Household } from './household.interface';
import { EdibleItem, Item } from './item.interface';

export interface Inventory {
  id: ObjectId;
  ownerId?: User['id'] | Household['id'];
  ownedBy?: 'User' | 'Household';
  items?: Item[];
  edibles?: EdibleItem[];
  history?: Item[];
}
export interface ShoppingList {
  id: ObjectId;
  ownerId?: User['id'] | Household['id'];
  ownedBy?: 'User' | 'Household';
  items?: Item[];
  edibles?: EdibleItem[];
  totalCost?: number;
}
export interface WishList {
  id: ObjectId;
  ownerId?: User['id'];
  items?: Item[];
  edibles?: EdibleItem[];
}
