import {Ingredient} from "../../models/ingredient.model";
import * as ShoppingList from "./shopping-list.actions";
import {State} from "../../models/store.model";

const initialState: State = {
	ingredients: [
		new Ingredient('Apples', 5),
		new Ingredient('Tomatoes', 10)
	],
	editedIngredient: null,
	editedIngredientIndex: -1
};

export function shoppingListReduce(state: State = initialState, action: ShoppingList.Actions) {
	switch (action.type) {

		case ShoppingList.ADD_INGREDIENT:
			return {
				...state,
				ingredients: [...state.ingredients, action.payload]
			};

		case ShoppingList.ADD_INGREDIENTS:
			return {
				...state,
				ingredients: [...state.ingredients, ...action.payload]
			};

		case ShoppingList.UPDATE_INGREDIENT:
			const ingredient = state.ingredients[state.editedIngredientIndex];
			const updatedIngredient = {
				...ingredient,
				...action.payload
			};
			const updatedIngredients = [...state.ingredients];
			updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

			return {
				...state,
				ingredients: updatedIngredients,
				editedIngredientIndex: -1,
				editedIngredient: null
			};

		case ShoppingList.DELETE_INGREDIENT:
			return {
				...state,
				ingredients: state.ingredients.filter((ig, igIndex) => {
					return igIndex !== state.editedIngredientIndex;
				}),
				editedIngredientIndex: -1,
				editedIngredient: null
			};

		case ShoppingList.START_EDIT:
			return {
				...state,
				editedIngredientIndex: action.payload,
				editedIngredient: { ...state.ingredients[action.payload] } // new object
			};

		case ShoppingList.STOP_EDIT:
			return {
				...state,
				editedIngredient: null,
				editedIngredientIndex: -1
			};

		default:
			return state;

	}
}
