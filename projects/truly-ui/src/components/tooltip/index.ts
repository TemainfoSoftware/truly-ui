import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TlToolTip } from './tooltip';
import { TooltipDirective } from './directives/tooltip.directive';

export * from './tooltip';

@NgModule( {
    imports: [
        CommonModule,
    ],
    declarations: [
        TlToolTip,
        TooltipDirective
    ],
    exports: [
        TlToolTip,
        TooltipDirective
    ],
    entryComponents: [
        TlToolTip
    ]
} )
export class TooltipModule {
}
