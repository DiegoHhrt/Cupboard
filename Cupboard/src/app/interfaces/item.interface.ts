import { ObjectId } from 'mongodb';
import { Category } from './';

export interface Item {
  id: ObjectId;
  name?: string;
  category?: Category['id'][];
  purchaseDate?: Date;
  currentAmmount?: number;
  boughtAmmount?: number;
  unit?: string;
  lowLevel?: number;
  cost?: number;
  imgUrl?: string;
  status?: boolean;
}
export interface EdibleItem {
  id: ObjectId;
  edible?: boolean;
  item?: Item['id'];
  finishBy?: Date;
  nutritionProperties?: string;
}
