import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlTabControl } from './tabcontrol';
import { TlTab } from './tab/tab';

@NgModule({
    imports: [
      CommonModule,
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
