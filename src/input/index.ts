import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TlInput } from './input';

export * from './input';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TlInput,
    ],
    exports: [
        TlInput,
    ]
})
export class InputModule {}
