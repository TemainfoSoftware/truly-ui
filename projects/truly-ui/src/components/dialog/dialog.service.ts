/*
 MIT License

 Copyright (c) 2019 Temainfo Software

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
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { ModalService } from '../modal/services/modal.service';

import { TlDialogInfo } from './dialog-info/dialog-info';
import { TlDialogAlert } from './dialog-alert/dialog-alert';
import { TlDialogError } from './dialog-error/dialog-error';
import { TlDialogConfirmation } from './dialog-confirmation/dialog-confirmation';

import { ConfirmationOptions } from './dialog-confirmation/confirmation-options';
import { ErrorOptions } from './dialog-error/error-options';
import { AlertOptions } from './dialog-alert/alert-options';
import { InfoOptions } from './dialog-info/info-options';
import { ModalOptions } from '../modal/interfaces/modal-options';
import { ModalResult } from '../core/enums/modal-result';

export interface ConfirmCallback {
  isYes?: any;
  isNo?: any;
}

@Injectable()
export class DialogService {

  constructor( private modalService: ModalService, private factoryResolver: ComponentFactoryResolver ) {
  }

  info( message: string, options: InfoOptions = {}, mdOptions?: ModalOptions ) {
    return new Promise( ( resolve ) => {
      this.modalService.createModalDialog( TlDialogInfo, this.factoryResolver, mdOptions ).then( value => {
        resolve( value );
      } );
      const optionsObj = Object.assign( options, { message: message } );
      this.setDialogOptions( optionsObj );
    } );
  }

  alert( message: string, options: AlertOptions = {}, mdOptions?: ModalOptions ) {
    return new Promise( ( resolve ) => {
      this.modalService.createModalDialog( TlDialogAlert, this.factoryResolver, mdOptions ).then( value => {
        resolve( value );
      } );
      const optionsObj = Object.assign( options, { message: message } );
      this.setDialogOptions( optionsObj );
    } );
  }

  error( message: string, options: ErrorOptions = {}, mdOptions?: ModalOptions ) {
    return new Promise( ( resolve ) => {
      this.modalService.createModalDialog( TlDialogError, this.factoryResolver, mdOptions ).then( value => {
        resolve( value );
      } );
      const optionsObj = Object.assign( options, { message: message } );
      this.setDialogOptions( optionsObj );
    } );
  }

  confirmation( message: string, callbackConfirmation: ConfirmCallback, options: ConfirmationOptions = {}, mdOptions?: ModalOptions ) {
    this.modalService.createModalDialog( TlDialogConfirmation, this.factoryResolver, mdOptions ).then((value: any) => {
      if ( value.mdResult === ModalResult.MRYES ) {
        callbackConfirmation.isYes(ModalResult.MRYES);
      } else if (value.mdResult === ModalResult.MRNO) {
        callbackConfirmation.isNo(ModalResult.MRNO);
      }
    });
    const optionsObj = Object.assign( options, { message: message } );
    this.setDialogOptions( optionsObj );
  }

  private setDialogOptions( options ) {
    Object.keys( options ).forEach( ( value ) => {
      this.modalService.componentInjected.instance[ value ] = options[ value ];
    } );
  }
}
