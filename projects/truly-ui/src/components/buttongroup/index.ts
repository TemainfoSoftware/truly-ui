import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlButtonGroup } from './buttongroup';
import { TlButtonGroupItem } from './buttongroup-item';

import { ButtonModule } from '../button/index';
import { IconsModule } from '../icons/index';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        IconsModule
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
