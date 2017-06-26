import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from "./modal.service";
import { TlModal } from './modal';

export * from './modal';

@NgModule( {
    imports: [
        CommonModule,
    ],
    declarations: [
        TlModal,
    ],
    exports: [
        TlModal,
    ],
    entryComponents: [
        TlModal
    ],
    providers: [
        ModalService
    ]
} )
export class ModalModule {
}
