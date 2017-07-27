import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlDropDownList } from './dropdownlist';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';

export * from './dropdownlist';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        TlDropDownList
    ],
    exports: [
        TlDropDownList
    ],
    providers: [IdGeneratorService, NameGeneratorService]
})
export class DropDownListModule {}
