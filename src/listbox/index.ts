import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlListBox } from './listbox';
import { LoadingModule } from '../loading/index';
import { ListBoxContainerDirective } from './lisbox-container-directive';

export * from './listbox';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LoadingModule
    ],
    declarations: [
        TlListBox,
        ListBoxContainerDirective,
    ],
    exports: [
        TlListBox,
        ListBoxContainerDirective,
    ],
    providers: [
    ]
})
export class ListBoxModule {}
