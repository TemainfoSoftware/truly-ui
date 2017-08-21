import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlRadioButton } from './radiobutton';
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
        TlRadioButton,
        TlRadioGroup
    ],
    exports: [
        TlRadioButton,
        TlRadioGroup
    ],
    providers: [
        TabIndexService,
        IdGeneratorService,
        NameGeneratorService,
    ]
})
export class RadioButtonModule {}
