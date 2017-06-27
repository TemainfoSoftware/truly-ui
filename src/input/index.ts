import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlInput } from './input';
import { DirectiveModule } from '../core/directives/index';

export * from './input';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DirectiveModule,
    ],
    declarations: [
        TlInput
    ],
    exports: [
        TlInput,
        DirectiveModule,
    ]
})
export class InputModule {}
