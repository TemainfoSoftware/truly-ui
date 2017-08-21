import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlRadioGroup } from './radiogroup';
import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        TlRadioGroup
    ],
    exports: [
        TlRadioGroup
    ],
    providers: [
        TabIndexService,
        IdGeneratorService,
        NameGeneratorService,
    ]
})
export class RadioGroupModule {}
