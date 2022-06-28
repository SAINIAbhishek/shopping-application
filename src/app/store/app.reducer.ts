import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../modules/shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../modules/auth/store/auth.reducer';
import * as fromRecipe from '../modules/recipes/store/recipe.reducer';
import {AppState} from '../models/state';

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipe.recipeReducer
};
