import { ObjectId } from 'mongodb';
import { User, Household, EdibleItem, Item } from './';

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
