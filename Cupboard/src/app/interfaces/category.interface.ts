import { ObjectId } from 'mongodb';

export interface Category {
  id: ObjectId;
  name: string;
  status: boolean;
}
