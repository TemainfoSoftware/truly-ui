import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TlToolTip } from './tooltip';
import { TooltipDirective } from './directives/tooltip.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { TlToolTipContainer } from './parts/tooltip-container';

@NgModule( {
    imports: [
        CommonModule,
        OverlayModule
    ],
    declarations: [
        TlToolTip,
        TlToolTipContainer,
        TooltipDirective
    ],
    exports: [
        TlToolTip,
        TlToolTipContainer,
        TooltipDirective
    ],
    entryComponents: [
        TlToolTipContainer
    ]
} )
export class TooltipModule {
}
