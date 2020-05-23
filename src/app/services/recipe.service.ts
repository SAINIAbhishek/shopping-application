import {EventEmitter, Injectable} from "@angular/core";
import {Recipe} from "../models/recipe.model";
import {Ingredient} from "../models/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";

@Injectable({providedIn: "root"})
export class RecipeService {

	recipeSelected = new EventEmitter<Recipe>();

	constructor(private slService: ShoppingListService) {}

	private recipes: Recipe[] = [
		new Recipe(
			'Tasty Schnitzel',
			'A super-tasty Schnitzel - just awesome!',
			'https://www.evopedia.net/wp-content/uploads/2018/06/1280px-Wiener-Schnitzel02.jpg',
			[new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
		),
		new Recipe('Big Fat Burger',
			'What else you need to say?',
			'https://storage.needpix.com/rsynced_images/burger-2762431_1280.jpg',
			[new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
		)
	];

	getRecipes() {
		return this.recipes.slice();
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.slService.addIngredients(ingredients);
	}

}
