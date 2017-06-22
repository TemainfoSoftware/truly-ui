import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlInput } from './input';
import { FieldMaskDirective } from '../core/directives/field-mask.directive';
import { CharcaseDirective } from '../core/directives/charcase.directive';
import { TooltipDirective } from '../core/directives/tooltip.directive';
import { TlToolTip } from '../tooltip/tooltip';

export * from './input';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        TlInput,
        TlToolTip,
        FieldMaskDirective,
        CharcaseDirective,
        TooltipDirective
    ],
    exports: [
        TlInput,
        FieldMaskDirective,
        CharcaseDirective,
        TooltipDirective
    ],
    entryComponents: [
        TlToolTip
    ]
})
export class InputModule {}
