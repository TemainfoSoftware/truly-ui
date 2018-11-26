import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { TlSplitButton } from './splitbutton';
import { TlSplitButtonAction } from './splitbutton-action';

import { ButtonModule } from '../button/index';
import { IconsModule } from '../icons/index';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        ButtonModule,
        IconsModule
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
