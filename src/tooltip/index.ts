import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TlToolTip } from './tooltip';
import { DirectiveModule } from '../core/directives/index';

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
