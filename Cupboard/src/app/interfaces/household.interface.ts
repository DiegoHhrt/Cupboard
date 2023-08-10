import { ObjectId } from 'mongodb';
import {
  Inventory,
  Item,
  NutritionGoals,
  NutritionProperties,
  ShoppingList,
  User,
} from './';

interface PopulatedUser {
  name: string;
}
export interface Household {
  id: ObjectId;
  name?: string;
  // members?: User['id'][] | PopulatedUser[];
  // admins?: User['id'][] | PopulatedUser[];
  members?: PopulatedUser[];
  admins?: PopulatedUser[];
  shoppingList?: ShoppingList['id'];
  inventory?: Inventory['id'];
  plannedFoods?: PlannedFoods['id'][];
  nutritionGoals?: NutritionGoals['id'];
  lowLevel?: number;
  currency?: string;
  budget?: number;
}

export interface PlannedFoods {
  uid?: ObjectId;
  id?: ObjectId;
  name?: string;
  ingredients?: Item['id'][];
  recipeLink?: string;
  plannedDate?: Date;
  nutritionProperties?: NutritionProperties['id'];
}

export interface HouseholdInfoResponse {
  ok: boolean;
  household?: Household;
  msg?: string;
}
