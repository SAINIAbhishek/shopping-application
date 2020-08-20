import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { RecipesComponent } from './modules/recipes/recipes.component';
import { RecipeListComponent } from './modules/recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './modules/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './modules/recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './modules/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './modules/shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from "./directives/dropdown.directive";
import { RecipeStartComponent } from './modules/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './modules/recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './modules/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
