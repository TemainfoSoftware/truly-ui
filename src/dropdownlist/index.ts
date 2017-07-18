import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlDropDownList } from './dropdownlist';

export * from './dropdownlist';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TlDropDownList
    ],
    exports: [
        TlDropDownList
    ]
})
export class DropDownListModule {}
