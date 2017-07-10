import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '../button';
import { TlButtonGroup } from './buttongroup';
import { TlButtonGroupItem } from './buttongroup-item';

export * from './buttongroup';

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
