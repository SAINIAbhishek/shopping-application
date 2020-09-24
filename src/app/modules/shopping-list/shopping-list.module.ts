import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		RouterModule.forChild([
			{ path: 'shopping-list', component: ShoppingListComponent }
		])
	],
	declarations: [
		ShoppingListComponent,
		ShoppingEditComponent
	]
})

export class ShoppingListModule {}
