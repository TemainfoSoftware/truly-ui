import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HighlightJsModule } from 'ngx-highlight-js';
import { GettingStarted } from './getting-started.component';

@NgModule({
  declarations: [
    GettingStarted
  ],
  imports: [
    FormsModule,
    HighlightJsModule,
    HttpModule,
  ],
  exports: [GettingStarted]
})
export class GettingStartedModule { }
