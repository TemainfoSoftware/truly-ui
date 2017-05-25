import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
