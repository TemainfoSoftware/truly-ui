import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlButton } from './button';

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
    ]
})
export class ButtonModule {}
