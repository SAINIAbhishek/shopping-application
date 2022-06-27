import {Ingredient} from './ingredient.model';
import {User} from './user.model';

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AuthState {
  user: User;
  authError: string;
  loading: boolean;
}

export interface AppState {
  shoppingList: ShoppingListState;
  auth: AuthState;
}
