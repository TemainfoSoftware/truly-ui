import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlRadioButton } from './radiobutton';
import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { RadioButtonListService } from './radiobuttonlist.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        TlRadioButton
    ],
    exports: [
        TlRadioButton
    ],
    providers: [
        TabIndexService,
        IdGeneratorService,
        NameGeneratorService,
        RadioButtonListService
    ]
})
export class RadioButtonModule {}
