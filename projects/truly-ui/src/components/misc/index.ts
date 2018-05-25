import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShortcutDirective } from './shortcut.directive';
import { ShortcutService } from '../core/helper/shortcut.service';
import { FixedPositionDirective } from './fixed-position.directive';
import { RelativeWindowPosition } from './relative-window-position.directive';

export * from './shortcut.directive';
export * from './fixed-position.directive';
export * from './relative-window-position.directive';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    ShortcutDirective,
    RelativeWindowPosition,
    FixedPositionDirective
  ],
  exports: [
    ShortcutDirective,
    RelativeWindowPosition,
    FixedPositionDirective
  ],
  providers: [
    ShortcutService,
  ]
} )
export class MiscModule {
}
