import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../modules/shopping-list/store/shopping-list.reducer';
import {AppState} from '../models/state';

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer
};
