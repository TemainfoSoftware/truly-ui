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
import { ActionsModal } from '../core/enums/actions-modal';
import { LOCALE_I18N } from '../i18n/i18n.service';
import { ComponentFactoryResolver, ElementRef } from '@angular/core';

export interface ModalConfig {
  factory: ComponentFactoryResolver;
  executeAction: ActionsModal;
  identifier: string;
  dataForm?: Object;
  deleteConfirmationMessage?: string;
  recordNotFoundMessage?: string;
  parentElement?: ElementRef;
  actions?: {
    insertCall?: Function;
    updateCall?: Function;
    deleteCall?: Function;
    viewCall?: Function;
  };
}

export class ModalConfiguration implements ModalConfig {

  factory;
  executeAction;
  identifier;
  dataForm?;
  deleteConfirmationMessage?;
  recordNotFoundMessage?;
  parentElement?;

  constructor() {
    this.factory = null;
    this.executeAction = ActionsModal.INSERT;
    this.identifier = 'MODAL_1';
    this.dataForm = null;
    this.deleteConfirmationMessage = LOCALE_I18N.Form.deleteConfirmationMessage;
    this.recordNotFoundMessage = LOCALE_I18N.Form.recordNotFoundMessage;
    this.parentElement = null;
  }

}
