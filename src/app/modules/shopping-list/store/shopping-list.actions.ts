import { Action } from '@ngrx/store';
import {Ingredient} from '../../../models/ingredient.model';

export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export type ShoppingListActions =
  | AddIngredient;
