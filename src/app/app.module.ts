import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { AuthComponent } from './modules/auth/auth.component';
import { LoadingSpinnerComponent } from './modules/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from "./services/auth-interceptor.service";
import { RecipesModule } from "./modules/recipes/recipes.module";
import { ShoppingListModule } from "./modules/shopping-list/shopping-list.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule
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
