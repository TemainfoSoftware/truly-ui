import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlListBox } from './listbox';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        TlListBox
    ],
    exports: [
        TlListBox
    ]
})
export class ListBoxModule {}
