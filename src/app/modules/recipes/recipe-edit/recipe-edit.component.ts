import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../../../services/recipe.service";

@Component({
  selector: 'recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})

export class RecipeEditComponent implements OnInit {

  private _id: number;

  private _editMode = false;

  private _recipeForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this._id = +params['id'];
          this._editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this._editMode) {
      this.recipeService.updateRecipe(this._id, this._recipeForm.value);
    } else {
      this.recipeService.addRecipe(this._recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this._recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this._recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this._editMode) {
      const recipe = this.recipeService.getRecipe(this._id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }

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

}
