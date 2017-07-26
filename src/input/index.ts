import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlInput } from './input';
import { DirectiveModule } from '../core/directives/index';
import { IdGeneratorService } from "../core/helper/idgenerator.service";
import { NameGeneratorService } from "../core/helper/namegenerator.service";

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
    ],
    providers: [
        IdGeneratorService,
        NameGeneratorService
    ]
})
export class InputModule {}
