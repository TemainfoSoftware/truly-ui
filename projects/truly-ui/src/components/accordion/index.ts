import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlAccordion } from './accordion';
import { TlAccordionItem } from './parts/accordion-item/accordion-item';
import { AccordionService } from './services/accordion.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TlAccordion,
    TlAccordionItem
  ],
  exports: [
    TlAccordion,
    TlAccordionItem
  ],
})
export class AccordionModule {}
