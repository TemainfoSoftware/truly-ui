import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {PortalModule} from '@angular/cdk/portal';
import {OverlayModule} from '@angular/cdk/overlay';
import {IconsModule} from '../icons/index';
import {TlContextMenuComponent} from './context-menu';
import {ContextMenuService} from './services/contextmenu.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PortalModule,
    OverlayModule,
    IconsModule
  ],
  declarations: [
    TlContextMenuComponent,
  ],
  exports: [
    TlContextMenuComponent,
  ],
  entryComponents: [
    TlContextMenuComponent
  ],
  providers: [ ContextMenuService ]
})
export class ContextMenuModule {
}
