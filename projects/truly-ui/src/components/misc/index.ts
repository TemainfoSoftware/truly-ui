import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FixedPositionDirective } from './fixed-position.directive';
import { RelativeWindowPosition } from './relative-window-position.directive';
import { ScrollManager } from './scroll-manager.directive';
import { ListOptionDirective } from './listoption.directive';
import {HighlightPipe} from './highlight.pipe';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    RelativeWindowPosition,
    FixedPositionDirective,
    ListOptionDirective,
    ScrollManager,
    HighlightPipe
  ],
  exports: [
    RelativeWindowPosition,
    FixedPositionDirective,
    ListOptionDirective,
    ScrollManager,
    HighlightPipe
  ]
} )
export class MiscModule {
}
