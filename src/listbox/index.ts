import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlListBox } from './listbox';
import { ListBoxContainerDirective } from './lisbox-container-directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        TlListBox,
        ListBoxContainerDirective,
    ],
    exports: [
        TlListBox,
        ListBoxContainerDirective,
    ],
})
export class ListBoxModule {}
