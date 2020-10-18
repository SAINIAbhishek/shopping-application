import {Ingredient} from "./ingredient.model";

export interface State {
	ingredients: Ingredient[];
	editedIngredient: Ingredient;
	editedIngredientIndex: number;
}

export interface AppState {
	shoppingList: State;
}
