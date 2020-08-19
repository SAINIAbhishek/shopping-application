import {Injectable} from "@angular/core";
import {RecipesDataService} from "../services/recipes-data.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "../models/recipe.model";
import {RecipeService} from "../services/recipe.service";

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Array<Recipe>> {

	constructor(private _recipesDataService: RecipesDataService,
							private _recipeService: RecipeService) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const recipes = this._recipeService.getRecipes();

		if (recipes.length === 0) {
			return this._recipesDataService.getAll();
		} else {
			return recipes;
		}

	}

}
