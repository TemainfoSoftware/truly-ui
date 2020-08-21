import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogService } from './dialog.service';

import { TlDialogAlert } from './dialog-alert/dialog-alert';
import { TlDialogConfirmation } from './dialog-confirmation/dialog-confirmation';
import { TlDialogError } from './dialog-error/dialog-error';
import { TlDialogInfo } from './dialog-info/dialog-info';

import { ButtonModule } from '../button/index';
import { ModalModule } from '../modal/index';
import { IconsModule } from '../icons/index';

@NgModule( {
    imports: [
        CommonModule,
        ModalModule,
        ButtonModule,
        IconsModule
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
    providers: [
        DialogService,
    ]
} )
export class DialogModule {

}
