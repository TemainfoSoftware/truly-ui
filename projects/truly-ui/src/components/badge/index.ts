import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlBadge } from './badge';

export * from './badge';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TlBadge,
  ],
  exports: [
    TlBadge,
  ],
  providers: []
})
export class BadgeModule {}
