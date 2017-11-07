import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlInput } from './input';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { TabIndexService } from '../form/tabIndex.service';
import { CharcaseDirective } from './directives/charcase.directive';
import { TypeDirective } from './directives/type.directive';

export * from './input';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        TlInput,
        CharcaseDirective,
        TypeDirective
    ],
    exports: [
        TlInput,
        CharcaseDirective,
        TypeDirective
    ],
    providers: [
        IdGeneratorService,
        NameGeneratorService,
        TabIndexService
    ]
})
export class InputModule {}
