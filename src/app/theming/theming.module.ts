import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HighlightJsModule } from 'ngx-highlight-js';
import { ShowcaseCardModule } from '../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTableEventsModule } from '../shared/components/showcase-table-events/showcase-table-events.module';
import { ShowcaseTablePropertiesModule } from '../shared/components/showcase-table-properties/showcase-table-properties.module';
import { PaletteComponent, PaletteColorTagComponent } from './components/palette/palette.component';
import { ThemingComponent } from './theming.component';
import { ShowcaseHeaderModule } from '../shared/components/showcase-header/showcase-header.module';

@NgModule({
  imports: [
    CommonModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule,
    ShowcaseHeaderModule,
    RouterModule.forChild( [
      { path: '', component: ThemingComponent }
    ] )
  ],
  declarations: [ ThemingComponent, PaletteComponent, PaletteColorTagComponent ],
  exports: [ ThemingComponent ]
})
export class ThemingModule { }
