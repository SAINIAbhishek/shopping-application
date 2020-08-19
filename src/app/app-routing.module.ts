import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from "./modules/recipes/recipes.component";
import { RecipeDetailComponent } from "./modules/recipes/recipe-detail/recipe-detail.component";
import { ShoppingListComponent } from "./modules/shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./modules/recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./modules/recipes/recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./resolvers/recipes-resolver.service";

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
