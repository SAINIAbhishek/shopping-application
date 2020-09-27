import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../../../models/recipe.model";
import {RecipeService} from "../../../services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})

export class RecipeListComponent implements OnInit, OnDestroy {

  private _recipes: Recipe[];

  private _subscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._subscription = this.recipeService.recipesChanged.subscribe( (recipes: Recipe[]) => {
      this._recipes = recipes;
    });
    this._recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  get recipes(): Recipe[] {
    return this._recipes;
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
