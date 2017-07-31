import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/index';
import { DialogService } from './dialog.service';
import { TlDialogInfo } from './dialog-info/dialog-info';
import { TlDialogAlert } from './dialog-alert/dialog-alert';
import { TlDialogError } from './dialog-error/dialog-error';
import { TlDialogConfirmation } from './dialog-confirmation/dialog-confirmation';
import { ModalService } from '../modal/modal.service';
import { ModalModule } from '../modal/index';
import { TabIndexService } from "../form/tabIndex.service";
import { IdGeneratorService } from "../core/helper/idgenerator.service";
import { NameGeneratorService } from "../core/helper/namegenerator.service";
import { TlDialogBackdrop } from "./dialog-backdrop/dialog-backdrop";

export * from '../dialog';

@NgModule( {
    imports: [
        CommonModule,
        ButtonModule,
        ModalModule
    ],
    declarations: [
        TlDialogInfo,
        TlDialogBackdrop,
        TlDialogAlert,
        TlDialogError,
        TlDialogConfirmation
    ],
    exports: [
        TlDialogInfo,
        TlDialogAlert,
        TlDialogBackdrop,
        TlDialogError,
        TlDialogConfirmation
    ],
    entryComponents: [
        TlDialogInfo,
        TlDialogBackdrop,
        TlDialogAlert,
        TlDialogError,
        TlDialogConfirmation
    ],
    providers: [
        ModalService,
        DialogService,
        TabIndexService,
        IdGeneratorService,
        NameGeneratorService
    ]
} )
export class DialogModule {

}
