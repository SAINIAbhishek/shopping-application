import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../../../models/recipe.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../../models/state';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})

export class RecipeListComponent implements OnInit, OnDestroy {

  private _recipes: Recipe[];

  private _subscription: Subscription;

  constructor(private router: Router,
              private store: Store<AppState>,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._subscription = this.store
      .select('recipes')
      .pipe(map(recipesState => recipesState.recipes))
      .subscribe( (recipes: Recipe[]) => {
      this._recipes = recipes;
    });
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute}).then();
  }

  get recipes(): Recipe[] {
    return this._recipes;
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
