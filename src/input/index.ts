import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlInput } from './input';
import { FieldMaskDirective } from '../core/directives/field-mask.directive';
import { CharcaseDirective } from '../core/directives/charcase.directive';
import { TooltipModule } from '../tooltip/index';

export * from './input';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TooltipModule,
    ],
    declarations: [
        TlInput,
        FieldMaskDirective,
        CharcaseDirective,
    ],
    exports: [
        TlInput,
        FieldMaskDirective,
        CharcaseDirective,
    ]
})
export class InputModule {}
