import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../models/state';
import * as RecipesActions from '../store/recipe.actions';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {RECIPE_AMOUNT_REGEX} from '../../../utils/regex';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})

export class RecipeEditComponent implements OnInit, OnDestroy {

  private _id: number;

  private _editMode = false;

  private _recipeForm: FormGroup;

  private _storeSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this._id = +params['id'];
      this._editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this._editMode) {
      this.store.dispatch(
        new RecipesActions.UpdateRecipe({
          index: this._id,
          newRecipe: this._recipeForm.value
        })
      );
    } else {
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
    }

    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this._recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(RECIPE_AMOUNT_REGEX)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this._recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute}).then();
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this._editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
      this._storeSub = this.store
        .select('recipes')
        .pipe(
          map(recipeState => {
            return recipeState.recipes.find((recipe, index) => {
              return index === this._id;
            });
          })
        )
        .subscribe(recipe => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe['ingredients']) {
            for (const ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(RECIPE_AMOUNT_REGEX)
                  ])
                })
              );
            }
          }
        });
    }

    this._recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });

  }

  get controls() {
    return (<FormArray>this._recipeForm.get('ingredients')).controls;
  }

  get id(): number {
    return this._id;
  }

  get recipeForm(): FormGroup {
    return this._recipeForm;
  }

  ngOnDestroy() {
    if (this._storeSub) {
      this._storeSub.unsubscribe();
    }
  }

}
