import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShortcutDirective } from './shortcut.directive';
import { ShortcutService } from '../core/helper/shortcut.service';
import { FixedPositionDirective } from './fixed-position.directive';
import { RelativeWindowPosition } from './relative-window-position.directive';
import { ScrollManager } from './scroll-manager.directive';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    ShortcutDirective,
    RelativeWindowPosition,
    FixedPositionDirective,
    ScrollManager
  ],
  exports: [
    ShortcutDirective,
    RelativeWindowPosition,
    FixedPositionDirective,
    ScrollManager
  ],
  providers: [
    ShortcutService,
  ]
} )
export class MiscModule {
}
