import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectiveModule } from '../core/directives/index';
import { TlToolTip } from './tooltip';

export * from './tooltip';

@NgModule( {
    imports: [
        CommonModule,
        DirectiveModule
    ],
    declarations: [
        TlToolTip,
    ],
    exports: [
        TlToolTip,
    ],
    entryComponents: [
        TlToolTip
    ]
} )
export class TooltipModule {
}
