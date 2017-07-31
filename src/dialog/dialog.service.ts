/*
 MIT License

 Copyright (c) 2017 Temainfo Sistemas

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
import { Injectable } from '@angular/core';
import { ModalService } from '../modal/modal.service';

import { TlDialogInfo } from './dialog-info/dialog-info';
import { TlDialogAlert } from './dialog-alert/dialog-alert';
import { TlDialogError } from './dialog-error/dialog-error';
import { TlDialogConfirmation } from './dialog-confirmation/dialog-confirmation';

import { ModalInfoOptions } from './dialog-info/modal-info-options';
import { ModalAlertOptions } from './dialog-alert/modal-alert-options';
import { ModalErrorOptions } from './dialog-error/modal-error-options';
import { ModalConfirmationOptions } from './dialog-confirmation/modal-confirmation-options';

import { ConfirmationOptions } from './dialog-confirmation/confirmation-options';
import { ErrorOptions } from './dialog-error/error-options';
import { AlertOptions } from './dialog-alert/alert-options';
import { InfoOptions } from './dialog-info/info-options';
import { TlDialogBackdrop } from './dialog-backdrop/dialog-backdrop';

@Injectable()
export class DialogService {

    public modalResult;

    constructor( public modalService: ModalService ) {}

    info( message, callback, options?: InfoOptions ) {
        this.setModalOptions( ModalInfoOptions, options );
        this.modalService.createBackdrop( TlDialogBackdrop );
        this.modalService.createModal( TlDialogInfo, ModalInfoOptions,  callback );
        this.modalService.componentInjected.instance.message = message;
        this.setDialogOptions( options );
    }

    confirmation( message, callback, options?: ConfirmationOptions) {
        this.setModalOptions( ModalConfirmationOptions, options );
        this.modalService.createBackdrop( TlDialogBackdrop );
        this.modalService.createModal( TlDialogConfirmation, ModalConfirmationOptions, callback );
        this.modalService.componentInjected.instance.message = message;
        this.setDialogOptions( options );
    }

    alert( message, callback, options?: AlertOptions ) {
        this.setModalOptions( ModalAlertOptions, options );
        this.modalService.createBackdrop( TlDialogBackdrop );
        this.modalService.createModal( TlDialogAlert, ModalAlertOptions, callback );
        this.modalService.componentInjected.instance.message = message;
        this.setDialogOptions( options );
    }

    error( message, callback, options?: ErrorOptions ) {
        this.setModalOptions( ModalErrorOptions, options );
        this.modalService.createBackdrop( TlDialogBackdrop );
        this.modalService.createModal( TlDialogError, ModalErrorOptions, callback );
        this.modalService.componentInjected.instance.message = message;
        this.setDialogOptions( options );
    }

    setModalOptions( typeModal, options ) {
        if ( !this.existOptions( options ) ) {
            return;
        }
        Object.keys( options ).forEach( ( value ) => {
            typeModal[ value ] = options[ value ];
        } );

    }

    setDialogOptions( options ) {
        if ( !this.existOptions( options ) ) {
            return;
        }
        Object.keys( options ).forEach( ( value ) => {
            this.modalService.componentInjected.instance[ value ] = options[ value ];
        } );
    }

    existOptions( options ) {
        if (options === undefined) {
            return false;
        }
        return Object.keys(options).length > 0;
    }
}
