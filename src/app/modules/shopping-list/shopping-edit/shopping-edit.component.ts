import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../../models/ingredient.model";
import {ShoppingListService} from "../../../services/shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;

  private _subscription: Subscription;

  private _editMode = false;

  private _editedItemIndex: number;

  private _editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this._subscription = this.slService.startedEditing.subscribe((index: number) => {
      this._editedItemIndex = index;
      this._editMode = true;
      this._editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this._editedItem.name,
        amount: this._editedItem.amount
      })
    });
  }

  public onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this._editMode) {
      this.slService.updateIngredient(this._editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this._editMode = false;
    form.reset();
  }

  public onClear() {
    this.slForm.reset();
    this._editMode = false;
  }

  public onDelete() {
    this.slService.deleteIngredient(this._editedItemIndex);
    this.onClear();
  }

  get editMode(): boolean {
    return this._editMode;
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
