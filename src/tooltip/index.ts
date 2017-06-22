import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TlToolTip } from './tooltip';
import { TooltipDirective } from '../core/directives/tooltip.directive';

export * from './tooltip';

@NgModule( {
    imports: [
        CommonModule,
    ],
    declarations: [
        TooltipDirective,
    ],
    exports: [
        TooltipDirective,
    ],
    entryComponents: [
        TlToolTip
    ]
} )
export class TooltipModule {
}
