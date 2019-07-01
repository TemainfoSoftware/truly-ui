import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlRadioButton } from './radiobutton';
import { TlRadioGroup } from './radiogroup';

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
})
export class RadioButtonModule {}
