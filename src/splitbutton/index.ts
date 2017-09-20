import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '../button';
import { TlSplitButton } from './splitbutton';
import { TlSplitButtonAction } from './splitbutton-action';

export * from './splitbutton';
export * from './splitbutton-action';

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
