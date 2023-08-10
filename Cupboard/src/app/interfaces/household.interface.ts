import { ObjectId } from 'mongodb';
import {
  Inventory,
  Item,
  NutritionGoals,
  NutritionProperties,
  ShoppingList,
  User,
} from './';

export interface Household {
  id: ObjectId;
  name?: string;
  members?: User['id'][] | { name: string };
  admins?: User['id'][] | { name: string };
  shoppingList?: ShoppingList['id'];
  inventory?: Inventory['id'];
  plannedFoods?: PlannedFoods['id'][];
  nutritionGoals?: NutritionGoals['id'];
  lowLevel?: number;
  currency?: string;
  budget?: number;
}

export interface PlannedFoods {
  id: ObjectId;
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
