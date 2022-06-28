import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {AuthComponent} from "./auth.component";

import {LoadingSpinnerModule} from "../loading-spinner/loading-spinner.module";
import {PlaceholderModule} from '../../directives/placeholder/placeholder.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LoadingSpinnerModule,
        PlaceholderModule
    ],
	declarations: [
		AuthComponent
	],
	exports: [
		AuthComponent
	]
})

export class AuthModule {}
