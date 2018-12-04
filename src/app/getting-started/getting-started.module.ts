import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightJsModule } from 'ngx-highlight-js';
import { GettingStartedComponent } from './getting-started.component';
import { ShowcaseCardModule } from '../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseHeaderModule } from '../shared/components/showcase-header/showcase-header.module';

@NgModule({
  declarations: [
    GettingStartedComponent
  ],
  imports: [
    FormsModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule
  ],
  exports: [GettingStartedComponent]
})
export class GettingStartedModule { }
