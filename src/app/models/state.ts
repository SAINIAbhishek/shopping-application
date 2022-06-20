import {Ingredient} from './ingredient.model';

export interface State {
  ingredients: Ingredient[];
}

export interface AppState {
  shoppingList: State;
}
