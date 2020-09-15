import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from "./modules/recipes/recipes.component";
import { RecipeDetailComponent } from "./modules/recipes/recipe-detail/recipe-detail.component";
import { ShoppingListComponent } from "./modules/shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./modules/recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./modules/recipes/recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./resolvers/recipes-resolver.service";
import { AuthComponent } from "./modules/auth/auth.component";
import {AuthGuard} from "./guards/auth-guard";

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService],
        runGuardsAndResolvers: "always"
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService],
        runGuardsAndResolvers: "always"
      },
    ]},
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
