import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlButtonGroup } from './buttongroup';
import { TlButtonGroupItem } from './buttongroup-item';

import { ButtonModule } from '../button/index';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule
    ],
    declarations: [
        TlButtonGroup,
        TlButtonGroupItem
    ],
    exports: [
        TlButtonGroup,
        TlButtonGroupItem
    ]
})
export class ButtonGroupModule {}
