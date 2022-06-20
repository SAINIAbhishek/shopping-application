import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../../models/ingredient.model';
import {ShoppingListService} from '../../services/shopping-list.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../models/state';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})

export class ShoppingListComponent implements OnInit {

  get ingredients$(): Observable<{ ingredients: Ingredient[] }> {
    return this._ingredients$;
  }

  private _ingredients$: Observable<{ ingredients: Ingredient[] }>;

  constructor(private slService: ShoppingListService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this._ingredients$ = this.store.select('shoppingList');
  }

  public onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

}
