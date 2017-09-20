import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TlMultiSelect } from './multiselect';
import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';

export * from './multiselect';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TlMultiSelect,
  ],
  exports: [
    TlMultiSelect,
  ],
  providers: [
    TabIndexService,
    IdGeneratorService,
    NameGeneratorService]
})
export class MultiSelectModule {}
