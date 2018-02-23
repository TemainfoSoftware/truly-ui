import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShortcutDirective } from './shortcut.directive';
import { ShortcutService } from '../core/helper/shortcut.service';
import { FixedPositionDirective } from './fixed-position.directive';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    ShortcutDirective,
    FixedPositionDirective
  ],
  exports: [
    ShortcutDirective,
    FixedPositionDirective
  ],
  providers: [
    ShortcutService,
  ]
} )
export class MiscModule {
}
