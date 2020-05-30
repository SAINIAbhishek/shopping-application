import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from "./modules/recipes/recipes.component";
import { RecipeDetailComponent } from "./modules/recipes/recipe-detail/recipe-detail.component";
import { ShoppingListComponent } from "./modules/shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./modules/recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./modules/recipes/recipe-edit/recipe-edit.component";

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent },
    ]},
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
