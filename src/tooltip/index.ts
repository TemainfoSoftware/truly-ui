import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TlToolTip } from './tooltip';
import { TooltipDirective } from '../core/directives/tooltip.directive';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export * from './tooltip';

@NgModule( {
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule
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
