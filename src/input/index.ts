import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TlInput } from './input';

export * from './input';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        TlInput,
    ],
    exports: [
        TlInput,
    ]
})
export class InputModule {}
