import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlCheckBox } from './checkbox';

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
})
export class CheckBoxModule {}
