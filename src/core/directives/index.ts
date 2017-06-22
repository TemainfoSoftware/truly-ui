import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CharcaseDirective } from './charcase.directive';
import { FieldMaskDirective } from './field-mask.directive';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        CharcaseDirective,
        FieldMaskDirective,
        TooltipDirective
    ],
    exports: [
        CharcaseDirective,
        FieldMaskDirective,
        TooltipDirective
    ],
})
export class DirectiveModule {}
