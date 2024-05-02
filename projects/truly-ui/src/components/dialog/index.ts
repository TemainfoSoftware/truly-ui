import { CommonModule, DOCUMENT } from '@angular/common';
import { Inject, NgModule } from '@angular/core';

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

  private window: Window;

  constructor(@Inject(DOCUMENT) private document: Document) {
    // Workaround to expose the dialog components to the window object
    // This is necessary to use the dialog components in the browser console and not generate circular dependencies with modal service
    this.window = this.document.defaultView;
    this.window['TlDialogConfirmation'] = TlDialogConfirmation;
    this.window['TlDialogInfo'] = TlDialogInfo;
  }
}
