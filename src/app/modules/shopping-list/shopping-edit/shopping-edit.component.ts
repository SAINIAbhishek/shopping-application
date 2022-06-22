import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../../models/ingredient.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../../models/state';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;

  private _subscription: Subscription;

  private _editMode = false;

  private _editedItem: Ingredient;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this._subscription = this.store.select('shoppingList').subscribe((stateData) => {
      if (stateData.editedIngredientIndex > -1) {
        this._editMode = true;
        this._editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this._editedItem.name,
          amount: this._editedItem.amount
        });
      } else {
        this._editMode = false;
      }
    });
  }

  public onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this._editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }

    this._editMode = false;
    form.reset();
  }

  public onClear() {
    this.slForm.reset();
    this._editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  public onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  get editMode(): boolean {
    return this._editMode;
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
