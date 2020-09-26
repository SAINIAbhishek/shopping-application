import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {HeaderComponent} from "./header.component";
import {RouterModule} from "@angular/router";
import {DropdownModule} from "../../directives/dropdown/dropdown.module";

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		DropdownModule
	],
	declarations: [
		HeaderComponent
	],
	exports: [
		HeaderComponent
	]
})

export class HeaderModule {}
