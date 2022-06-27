import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './modules/auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'recipes', loadChildren: './modules/recipes/recipes.module#RecipesModule' },
  { path: 'shopping-list', loadChildren: './modules/shopping-list/shopping-list.module#ShoppingListModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
