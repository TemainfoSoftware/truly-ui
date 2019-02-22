import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlPanelGroup } from './panelgroup';
import { IconsModule } from '../icons/index';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IconsModule
    ],
    declarations: [
        TlPanelGroup
    ],
    exports: [
        TlPanelGroup
    ]
})
export class PanelGroupModule {}
