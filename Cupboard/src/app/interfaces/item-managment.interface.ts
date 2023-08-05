import { Item } from './item.interface';

export interface ItemCreationData {
  name: string;
  edible: boolean;
  // category:Category[] TODO: verify if this is the correct way to do it
  category: string[];
  unit: string;
  purchaseDate?: Date;
  currentAmmount?: number;
  boughtAmmount?: number;
  lowLevel?: number;
  cost?: number;
  imgUrl?: string;
}

export interface ItemActionResp {
  ok: boolean;
  msg: string;
  item?: Item;
}

export interface EdibleCreationResp {} //TODO

export interface ItemUpdateData {
  // category:Category[] TODO: verify if this is the correct way to do it
  category?: string[];
  purchaseDate?: Date;
  currentAmmount?: number;
  boughtAmmount?: number;
  lowLevel?: number;
  cost?: number;
  imgUrl?: string;
}

export interface ItemDeleteResp {
  ok: boolean;
  msg: string;
}
