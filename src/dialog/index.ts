import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../modal/modal.service';
import { TlDialog } from './dialog';
import { ButtonModule } from '../button/index';

export * from './dialog';

@NgModule( {
    imports: [
        CommonModule,
        ButtonModule,
    ],
    declarations: [
        TlDialog,
    ],
    exports: [
        TlDialog,
    ],
    entryComponents: [
        TlDialog
    ],
    providers: [
        ModalService
    ]
} )
export class DialogModule {
}
