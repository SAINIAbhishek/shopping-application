import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../../models/ingredient.model";
import {ShoppingListService} from "../../services/shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})

export class ShoppingListComponent implements OnInit, OnDestroy {

  private _ingredients: Ingredient[] = [];

  private _subscription: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this._ingredients = this.slService.getIngredients();
    this._subscription = this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this._ingredients = ingredients;
    });
  }

  public onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  get ingredients(): Ingredient[] {
    return this._ingredients;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
