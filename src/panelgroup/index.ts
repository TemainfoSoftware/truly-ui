import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlPanelGroup } from './panelgroup';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        TlPanelGroup
    ],
    exports: [
        TlPanelGroup
    ]
})
export class PanelGroupModule {}
