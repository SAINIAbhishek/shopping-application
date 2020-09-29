import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../../models/ingredient.model";
import {ShoppingListService} from "../../services/shopping-list.service";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})

export class ShoppingListComponent implements OnInit, OnDestroy {

  // private _ingredients: Ingredient[] = [];

  private _ingredients: Observable<{ ingredients: Ingredient[] }>;

  // private _subscription: Subscription;

  constructor(private _shoppingListService: ShoppingListService,
              private _store: Store<any>) { }

  ngOnInit() {
    this._ingredients = this._store.select('shoppingList');
    // this._ingredients = this._shoppingListService.getIngredients();
    /*this._subscription = this._shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this._ingredients = ingredients;
    });*/
  }

  public onEditItem(index: number) {
    this._shoppingListService.startedEditing.next(index);
  }

  /*get ingredients(): Ingredient[] {
    return this._ingredients;
  }*/

  get ingredients(): Observable<{ ingredients: Ingredient[] }> {
    return this._ingredients;
  }

  ngOnDestroy(): void {
    // this._subscription.unsubscribe();
  }

}
