import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlButton } from './button';
import { ToneColorGenerator } from '../core/helper/tonecolor-generator';

export * from './button';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        TlButton
    ],
    exports: [
        TlButton
    ],
    providers: [
        ToneColorGenerator
    ]
})
export class ButtonModule {}
