import { Household } from 'src/app/interfaces/household.interface';
import { NutritionGoals } from 'src/app/interfaces/nutrition.interface';
import { User } from 'src/app/interfaces/user.interface';

export interface HouseholdCreationData {
  name: string;
  lowLevel?: number;
  currency?: string;
  budget?: number;
}

export interface HouseholdCreationResp {
  ok: boolean;
  household?: Household['name'];
  user?: User['userName'];
  msg?: string;
}

export interface NutritionGoalsCreationData {
  startingDate: Date;
  period: 'daily' | 'weekly' | 'monthly';
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

export interface NutritionGoalsCreationResp {
  ok: boolean;
  nutritionGoals?: NutritionGoals;
  household?: Household;
  msg?: string;
}
