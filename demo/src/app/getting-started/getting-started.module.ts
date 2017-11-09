import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HighlightJsModule } from 'ngx-highlight-js';
import { GettingStartedComponent } from './getting-started.component';

@NgModule({
  declarations: [
    GettingStartedComponent
  ],
  imports: [
    FormsModule,
    HighlightJsModule,
    HttpModule,
  ],
  exports: [GettingStartedComponent]
})
export class GettingStartedModule { }
