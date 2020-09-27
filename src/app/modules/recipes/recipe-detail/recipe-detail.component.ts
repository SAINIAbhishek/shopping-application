import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../../models/recipe.model";
import {RecipeService} from "../../../services/recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  private _recipe: Recipe;

  private _id: number;

  constructor(private recipeService: RecipeService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this._id = +params['id'];
          this._recipe = this.recipeService.getRecipe(this._id);
        }
      );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this._recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this._id);
    this.router.navigate(['/recipes']);
  }

  get recipe(): Recipe {
    return this._recipe;
  }

  get id(): number {
    return this._id;
  }

}
