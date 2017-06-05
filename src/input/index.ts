import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlInput } from './input';
import { FieldMask } from '../core/directives/field-mask';

export * from './input';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        TlInput,
        FieldMask
    ],
    exports: [
        TlInput,
        FieldMask
    ]
})
export class InputModule {}
