/*
 MIT License

 Copyright (c) 2019 Temainfo Sistemas

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
import {
  Input, OnInit, Directive, HostListener, ContentChild,
} from '@angular/core';
import { ModalResult } from '../../core/enums/modal-result';
import { ModalService } from '../services/modal.service';
import { TlButton } from '../../button/button';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

@Directive( {
  selector: '[mdResult]'
} )
export class ModalResultDirective implements OnInit {

  @Input( 'mdResult' ) mdResult: ModalResult;

  @Input( 'formResult' ) formResult;
  set formResultValue(value) {
    this.formResult = value;
  }

  @ContentChild( TlButton, {static: true} ) button: TlButton;

  private modalId: string;

  @HostListener( 'click' )
  onClick() {
    if (!this.button.disabled) {
      this.emitCallback();
    }
  }

  @HostListener( 'keydown.enter' )
  onKeyDown() {
    if (!this.button.disabled) {
      this.emitCallback();
    }
  }

  constructor( private modalService: ModalService ) {
  }

  ngOnInit() {
    this.modalId = this.modalService.instanceComponent.id;
    this.button.modalContext = this.modalService.instanceComponent.modal;
  }

  emitCallback(): Promise<any> {
    return new Promise( ( resolve ) => {
      if ( !this.mdResult || ModalResult.MRCUSTOM ) {
        return;
      }
      this.modalService.execCallBack( this.getResult(), this.modalId );
    } );
  }

  getResult() {
    if ( this.formResult ) {
      return {
        mdResult: ModalResult[ this.mdResult ],
        formResult: this.formResult
      };
    }
    return { mdResult: ModalResult[ this.mdResult ] };
  }

}
