import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlCheckBox } from './checkbox';
import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        TlCheckBox
    ],
    exports: [
        TlCheckBox
    ],
    providers: [
        TabIndexService,
        IdGeneratorService,
        NameGeneratorService,
    ]
})
export class CheckBoxModule {}
