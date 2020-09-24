import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { AuthInterceptorService } from "./services/auth-interceptor.service";
import { RecipesModule } from "./modules/recipes/recipes.module";
import { ShoppingListModule } from "./modules/shopping-list/shopping-list.module";
import { LoadingSpinnerModule } from "./modules/loading-spinner/loading-spinner.module";
import { AuthModule } from "./modules/auth/auth.module";
import { HeaderModule } from "./modules/header/header.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
    LoadingSpinnerModule,
    AuthModule,
    HeaderModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
