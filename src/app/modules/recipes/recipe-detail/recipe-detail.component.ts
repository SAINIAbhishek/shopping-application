import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../../models/recipe.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../../models/state';
import {map, switchMap} from 'rxjs/operators';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as RecipesActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  private _recipe: Recipe;

  private _id: number;

  constructor(private store: Store<AppState>,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map(params => {
          return +params['id'];
        }),
        switchMap(id => {
          this._id = id;
          return this.store.select('recipes');
        }),
        map(recipesState => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this._id;
          });
        })
      )
      .subscribe(recipe => {
        this._recipe = recipe;
      });
  }

  onAddToShoppingList() {
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this._recipe.ingredients)
    );
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute}).then();
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this._id));
    this.router.navigate(['/recipes']).then();
  }

  get recipe(): Recipe {
    return this._recipe;
  }

  get id(): number {
    return this._id;
  }

}
