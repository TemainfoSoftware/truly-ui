import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlTabControl } from './tabcontrol';
import { TlTab } from './tab/tab';
import { DirectiveModule } from '../core/directives/index';

export * from './tabcontrol';

@NgModule({
    imports: [
        CommonModule,
        DirectiveModule,
        FormsModule
    ],
    declarations: [
      TlTabControl,
      TlTab
    ],
    exports: [
      TlTabControl,
      TlTab
    ],
})
export class TabControlModule {}
