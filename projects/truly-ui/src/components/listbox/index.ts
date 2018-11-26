import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlListBox } from './listbox';
import { ListBoxContainerDirective } from './lisbox-container-directive';

import { BlockUIModule } from '../blockui/index';
import { IconsModule } from '../icons/index';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BlockUIModule,
        IconsModule
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
