import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes.component";
import {AuthGuard} from "../../guards/auth-guard";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipesResolverService} from "../../resolvers/recipes-resolver.service";

const recipeRoutes: Routes = [
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
			}
		]}
]

@NgModule({
	imports: [RouterModule.forChild(recipeRoutes)],
	exports: [RouterModule]
})

export class RecipesRoutingModule {}
