import { ObjectId } from 'mongodb';
import { Household } from 'src/app/interfaces/household.interface';
import { User } from 'src/app/interfaces/user.interface';
import { NutritionGoals } from '../../interfaces/nutrition.interface';

export interface HouseholdUpdateData {
  name?: string;
  budget?: number;
  currency?: string;
  lowLevel?: number;
}

export interface HouseholdUpdateResp {
  ok: boolean;
  household?: Household;
  msg?: string;
}

export interface UserActionData {
  userId: ObjectId;
}
export interface RemoveUserFromHouseholdData {
  userId: ObjectId;
  newAdminId?: ObjectId;
}

export interface UserActionResp {
  ok: boolean;
  household?: Household;
  dbUser?: User;
  msg?: string;
}

export interface UpdateHouseholdFoodData {
  name?: string;
  recipeLink?: string;
  plannedDate?: Date;
}

export interface UpdateHouseholdFoodResp {
  ok: boolean;
  plannedFoods: Household['plannedFoods'];
  msg?: string;
}

export interface NutritionGoalsUpdateData {
  period?: 'daily' | 'weekly' | 'monthly';
  startingDate?: Date;
  totalPeriodCalories?: number;
  totalPeriodProtein?: number;
  totalPeriodCarbs?: number;
  totalPeriodFat?: number;
  totalPeriodFiber?: number;
  totalPeriodSugar?: number;
  totalPeriodSodium?: number;
  totalPeriodCholesterol?: number;
  animalProductBalance?: number;
  vegetalProductBalance?: number;
  animalBalanceGoal?: number;
  vegetalBalanceGoal?: number;
}

export interface NutritionGoalsUpdateResp {
  ok: boolean;
  nutritionGoals?: NutritionGoals;
  msg?: string;
}
