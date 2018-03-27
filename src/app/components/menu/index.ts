import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscModule } from '../misc/index';
import { TlMenu } from './menu';
import { SubMenuService } from './services/submenu.service';
import { TlSimpleSubMenu } from './parts/simple/simple-sub-menu';
import { TlAdvancedSubMenu } from './parts/advanced/advanced-sub-menu';

export * from './menu';

@NgModule( {
  imports: [
    CommonModule,
    MiscModule
  ],
  declarations: [
    TlMenu,
    TlAdvancedSubMenu,
    TlSimpleSubMenu
  ],
  exports: [
    TlMenu,
    TlAdvancedSubMenu,
    TlSimpleSubMenu
  ],
  entryComponents: [ TlSimpleSubMenu ]
} )
export class MenuModule {
}
