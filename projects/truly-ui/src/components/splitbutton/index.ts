import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlSplitButton } from './splitbutton';
import { TlSplitButtonAction } from './splitbutton-action';

import { ButtonModule } from '../button/index';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule
    ],
    declarations: [
        TlSplitButton,
        TlSplitButtonAction
    ],
    exports: [
        TlSplitButton,
        TlSplitButtonAction
    ]
})
export class SplitButtonModule {}
