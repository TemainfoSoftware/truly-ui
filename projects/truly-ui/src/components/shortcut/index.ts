import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShortcutDirective } from './shortcut.directive';
import { ShortcutService } from './shortcut.service';
import { SHORTCUT_CONFIG, ShortcutConfig } from './shortcut.config';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    ShortcutDirective,
  ],
  exports: [
    ShortcutDirective,
  ],
} )
export class ShortcutModule {
  static forRoot( config?: ShortcutConfig ): ModuleWithProviders {
    return {
      ngModule: ShortcutModule,
      providers: [ {
        provide: SHORTCUT_CONFIG,
        useValue: config,
      },
        ShortcutService
      ]
    };
  }
}
