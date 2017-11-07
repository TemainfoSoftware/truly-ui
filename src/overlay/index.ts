import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlOverlayComponent } from './overlay.component';
import { TlOverlay } from "./overlay";

export * from './overlay';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        TlOverlay,
        TlOverlayComponent
    ],
    exports: [
        TlOverlay
    ],
    entryComponents: [
        TlOverlayComponent
    ]
})
export class OverlayModule {}
