import { ObjectId } from 'mongodb';
import { User } from './user.interface';
import { Inventory, ShoppingList } from './list.interface';
import { NutritionGoals, NutritionProperties } from './nutrition.interface';
import { Item } from './item.interface';

export interface Household {
  id: ObjectId;
  name?: string;
  members?: User['id'][];
  admins?: User['id'][];
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
