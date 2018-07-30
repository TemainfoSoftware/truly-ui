import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlSplitButton } from './splitbutton';
import { TlSplitButtonAction } from './splitbutton-action';

import { ButtonModule } from '../button/index';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        ButtonModule
    ],
    declarations: [
        TlSplitButton,
        TlSplitButtonAction
    ],
    exports: [
        TlSplitButton,
        TlSplitButtonAction
    ],
  entryComponents: [ TlSplitButtonAction ]
})
export class SplitButtonModule {}
