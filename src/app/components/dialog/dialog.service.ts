/*
 MIT License

 Copyright (c) 2018 Temainfo Sistemas

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
import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalService } from '../modal/modal.service';

import { TlDialogInfo } from './dialog-info/dialog-info';
import { TlDialogAlert } from './dialog-alert/dialog-alert';
import { TlDialogError } from './dialog-error/dialog-error';
import { TlDialogConfirmation } from './dialog-confirmation/dialog-confirmation';

import { ConfirmationOptions } from './dialog-confirmation/confirmation-options';
import { ErrorOptions } from './dialog-error/error-options';
import { AlertOptions } from './dialog-alert/alert-options';
import { InfoOptions } from './dialog-info/info-options';
import { TlBackdrop } from '../core/components/backdrop/backdrop';

@Injectable()
export class DialogService {

    public modalResult;

    constructor( public modalService: ModalService ) {}


    info( message: string, callback: Function, options?: InfoOptions ) {
        this.modalService.createBackdrop( TlBackdrop );
        this.modalService.createModalDialog( TlDialogInfo,  callback );
        this.modalService.componentInjected.instance.message = message;
        this.setDialogOptions( options );
    }

    confirmation( message: string, callback: Function, options?: ConfirmationOptions) {
        this.modalService.createBackdrop( TlBackdrop );
        this.modalService.createModalDialog( TlDialogConfirmation, callback );
        if (options) {
            this.modalService.componentInjected.instance.defaultOK = options.defaultOK;
        }
        this.modalService.componentInjected.instance.message = message;
        this.setDialogOptions( options );
    }

    alert( message: string, callback: Function, options?: AlertOptions ) {
        this.modalService.createBackdrop( TlBackdrop );
        this.modalService.createModalDialog( TlDialogAlert, callback );
        this.modalService.componentInjected.instance.message = message;
        this.setDialogOptions( options );
    }

    error( message: string, callback: Function, options?: ErrorOptions ) {
        this.modalService.createBackdrop( TlBackdrop );
        this.modalService.createModalDialog( TlDialogError, callback );
        this.modalService.componentInjected.instance.message = message;
        this.setDialogOptions( options );
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
