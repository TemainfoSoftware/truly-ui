import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TlPanelGroup } from './panelgroup';
import { IconsModule } from '../icons/index';
import { ShortcutModule } from '../shortcut';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ShortcutModule,
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
