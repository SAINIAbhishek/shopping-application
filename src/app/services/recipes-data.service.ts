import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "./recipe.service";
import {Recipe} from "../models/recipe.model";
import {map, tap} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class RecipesDataService {

	constructor(private _httpClient: HttpClient,
							private _recipeService: RecipeService) { }

	public save() {
		const recipes = this._recipeService.getRecipes();
		this._httpClient.put(
				'https://shopping-app-512de.firebaseio.com/recipes.json', recipes)
			.subscribe(response => {
				console.log(response);
			}, error => {
				console.error(error);
			});
	}

	public getAll() {
		return this._httpClient
			.get<Recipe[]>(
				'https://shopping-app-512de.firebaseio.com/recipes.json'
			)
			.pipe(
				map(recipes => {
					return recipes.map(recipe => {
						return {
							...recipe,
							ingredients: recipe.ingredients ? recipe.ingredients : []
						};
					});
				}),
				tap(recipes => {
					this._recipeService.setRecipes(recipes);
				})
			)
	}

}
