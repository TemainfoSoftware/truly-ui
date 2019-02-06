import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlListBox } from './listbox';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { A11yModule } from '@angular/cdk/a11y';
import { TlListBoxTemplate } from './parts/components/listbox-template';
import { FilterContainerModule } from '../core/components/filter/filter-container.module';
import { BlockUIModule } from '../blockui/index';
import { TlItemSelectedDirective } from './parts/directives/item-selected.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    A11yModule,
    BlockUIModule,
    FilterContainerModule
  ],
  declarations: [
    TlListBox,
    TlListBoxTemplate,
    TlItemSelectedDirective,
  ],
  exports: [
    TlListBox
  ]
})
export class ListBoxModule {}
