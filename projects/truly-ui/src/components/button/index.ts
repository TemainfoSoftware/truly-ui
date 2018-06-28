import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlButton } from './button';
import { ModalModule } from '../modal/index';
import { MiscModule } from '../misc/index';

@NgModule({
    imports: [
        CommonModule,
        MiscModule,
        ModalModule
    ],
    declarations: [
        TlButton,
    ],
    exports: [
        TlButton,
    ]
})
export class ButtonModule {}
