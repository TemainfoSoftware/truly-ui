import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlButton } from './button';
import { TabIndexService } from "../form/tabIndex.service";
import { IdGeneratorService } from "../core/helper/idgenerator.service";
import { NameGeneratorService } from "../core/helper/namegenerator.service";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        TlButton
    ],
    exports: [
        TlButton
    ],
    providers: [
        TabIndexService,
        IdGeneratorService,
        NameGeneratorService
    ]
})
export class ButtonModule {}
