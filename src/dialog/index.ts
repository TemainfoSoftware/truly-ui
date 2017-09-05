import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../button/index';
import { DialogService } from './dialog.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { ModalModule } from '../modal/index';
import { ModalService } from '../modal/modal.service';
import { TabIndexService } from '../form/tabIndex.service';

import { TlDialogAlert } from './dialog-alert/dialog-alert';
import { TlDialogConfirmation } from './dialog-confirmation/dialog-confirmation';
import { TlDialogError } from './dialog-error/dialog-error';
import { TlDialogInfo } from './dialog-info/dialog-info';

export * from '../dialog';

@NgModule( {
    imports: [
        CommonModule,
        ButtonModule,
        ModalModule
    ],
    declarations: [
        TlDialogInfo,
        TlDialogAlert,
        TlDialogError,
        TlDialogConfirmation
    ],
    exports: [
        TlDialogInfo,
        TlDialogAlert,
        TlDialogError,
        TlDialogConfirmation
    ],
    entryComponents: [
        TlDialogInfo,
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
