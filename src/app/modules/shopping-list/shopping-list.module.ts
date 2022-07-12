import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {AuthGuard} from '../../guards/auth-guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ShoppingListComponent, canActivate: [AuthGuard] }
    ])
  ],
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ]
})

export class ShoppingListModule {}
