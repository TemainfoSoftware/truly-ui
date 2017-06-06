import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlInput } from './input';
import { FieldMaskDirective } from '../core/directives/field-mask.directive';
import { UppercaseDirective } from '../core/directives/uppercase.directive';

export * from './input';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        TlInput,
        FieldMaskDirective,
        UppercaseDirective
    ],
    exports: [
        TlInput,
        FieldMaskDirective,
        UppercaseDirective
    ]
})
export class InputModule {}
