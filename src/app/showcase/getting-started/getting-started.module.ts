import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightJsModule } from 'ngx-highlight-js';
import { GettingStartedComponent } from './getting-started.component';

@NgModule({
  declarations: [
    GettingStartedComponent
  ],
  imports: [
    FormsModule,
    HighlightJsModule,
  ],
  exports: [GettingStartedComponent]
})
export class GettingStartedModule { }
