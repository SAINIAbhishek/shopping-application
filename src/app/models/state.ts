import {Ingredient} from './ingredient.model';
import {User} from './user.model';
import {Recipe} from './recipe.model';

export interface RecipeState {
  recipes: Recipe[];
}

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
  recipes: RecipeState;
  auth: AuthState;
}
