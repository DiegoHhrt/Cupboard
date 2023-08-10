import { ObjectId } from 'mongodb';
import { User, Household, EdibleItem, Item } from './';

export interface Inventory {
  uid?: ObjectId;
  id?: ObjectId;
  ownerId?:
    | { _id: User['id'] | Household['id']; name: string }
    | User['id']
    | Household['id'];
  ownedBy?: 'User' | 'Household';
  items?: Item[];
  edibles?: EdibleItem[];
  history?: Item[];
}
export interface ShoppingList {
  uid?: ObjectId;
  id?: ObjectId;
  ownerId?:
    | { _id: User['id'] | Household['id']; name: string }
    | User['id']
    | Household['id'];
  ownedBy?: 'User' | 'Household';
  items?: Item[];
  edibles?: EdibleItem[];
  totalCost?: number;
}
export interface WishList {
  uid?: ObjectId;
  id?: ObjectId;
  ownerId?: { _id: User['id'] | Household['id']; name: string } | User['id'];
  items?: Item[];
  edibles?: EdibleItem[];
}

export type ListTypes = 'inventory' | 'shopping-list' | 'wishlist';

export interface ListResponse {
  ok: boolean;
  listType: ListTypes;
  list: Inventory | ShoppingList | WishList;
  msg?: string;
}
