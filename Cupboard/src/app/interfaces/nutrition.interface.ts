import { ObjectId } from 'mongodb';
import { Household } from './';

export interface NutritionGoals {
  id: ObjectId;
  householdId?: Household['id'];
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
export interface NutritionProperties {
  id: ObjectId;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  cholesterol?: number;
  scale?: number;
  scalePortion?: number;
}
