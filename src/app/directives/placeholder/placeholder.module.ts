import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlaceholderDirective} from './placeholder.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PlaceholderDirective
  ],
  exports: [
    PlaceholderDirective
  ]
})

export class PlaceholderModule {}
