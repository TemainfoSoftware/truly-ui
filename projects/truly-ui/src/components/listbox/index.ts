import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TlListBox } from './listbox';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { A11yModule } from '@angular/cdk/a11y';
import { TlListBoxTemplate } from './components/listbox-template';
import { FilterContainerModule } from '../core/components/filter/filter-container.module';
import { BlockUIModule } from '../blockui/index';
import { ItemSelectedModule } from '../core/directives/itemSelected/item-selected.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    A11yModule,
    BlockUIModule,
    FilterContainerModule,
    ItemSelectedModule
  ],
  declarations: [
    TlListBox,
    TlListBoxTemplate,
  ],
  exports: [
    TlListBox
  ]
})
export class ListBoxModule {}
