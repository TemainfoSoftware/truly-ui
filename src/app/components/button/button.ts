/*
 MIT License

 Copyright (c) 2018 Temainfo Software

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
  Component, ElementRef, Input, ViewChild, Output, EventEmitter, AfterViewInit, OnInit,
} from '@angular/core';

import { ModalService } from '../modal/modal.service';
import { ModalResult } from '../core/enums/modal-result';
import { TabIndexService } from '../form/tabIndex.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { ComponentDefaultBase } from '../core/base/component-default.base';
import { KeyEvent } from '../core/enums/key-events';

@Component( {
    selector: 'tl-button',
    templateUrl: './button.html',
    styleUrls: [ './button.scss' ],
} )
export class TlButton extends ComponentDefaultBase implements OnInit, AfterViewInit {

    @Input() text = '';

    @Input() iconAddonBefore = '';

    @Input() iconAddonAfter = '';

    @Input() iconBeforeText = '';

    @Input() iconAfterText = '';

    @Input() height = '30px';

    @Input() width = '120px';

    @Input() defaultFocus = false;

    @Input() disabled = null;

    @Input() toggle = false;

    @Input() colorIconBefore = '';

    @Input() colorIconAfter = '';

    @Input() mdResult: ModalResult;

    @Input() formResult;

    @Input() color = 'basic';

    @Output() selected: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild( 'tlbutton' ) buttonElement: ElementRef;

    public shortcutManager = {};

    public toggleClassName = '';

    private _buttonSelected: boolean;

    private listModals;

    private parentElement;

    @Input() set buttonSelected( value: boolean ) {
        this._buttonSelected = value;
        this.executeToggle();
    }

    constructor( public button: ElementRef, public modalService: ModalService,
                 tabIndexService: TabIndexService, idService: IdGeneratorService, nameService: NameGeneratorService ) {
        super( tabIndexService, idService, nameService );
    }

    ngOnInit() {
      this.getElementParentModal();
      this.handleHeadElementButton();
    }

    ngAfterViewInit() {
        this.setElement( this.buttonElement, 'button' );
        if ( this.defaultFocus ) {
            this.buttonElement.nativeElement.focus();
        }
        if ( !ModalResult.propertyIsEnumerable( String( this.mdResult ) ) && this.mdResult !== undefined ) {
            throw new EvalError( this.mdResult + ' is not valid ModalResult value' );
        }
    }

    handleHeadElementButton() {
      this.modalService.head.subscribe((element: any ) => {
        if (!element.activeModal) {
          return;
        }
        if (this.parentElement === element.activeModal.instance.element.nativeElement) {
          this.shortcutManager = { 'activeModal': element.activeModal, 'button': this };
        }
      });
    }

    getElementParentModal() {
      this.listModals = document.querySelectorAll( 'tl-modal' );
      this.findParentOfChildren();
    }

    keydown( $event: KeyboardEvent ) {
        if ( $event.keyCode === KeyEvent.ENTER ) {
            this.clickToggle();
        }
    }

    clickToggle() {
        this.executeToggle();
        this.dispatchCallback();
    }

    executeToggle() {
        if ( this.toggle ) {
            if ( this._buttonSelected ) {
                this.toggleClassName = '-toggle';
                this.selected.emit( { selected : this._buttonSelected } );
                this._buttonSelected = false;
            } else {
                this.toggleClassName = '';
                this.selected.emit( { selected : this._buttonSelected } );
                this._buttonSelected = true;
            }
        }
    }

    dispatchCallback(): Promise<any> {
        return new Promise(( resolve ) => {
            if ( !this.mdResult || ModalResult.MRCUSTOM ) {
                return;
            }
            if ( this.listModals.length > 0 ) {
                this.modalService.execCallBack( {
                    mdResult : ModalResult[ this.mdResult ],
                    formResult : this.formResult
                }, this.findParentOfChildren() ).then(() => {
                    resolve();
                });
            }
        });
    }

    findParentOfChildren() {
        for ( let child = 0; child < this.listModals.length; child++ ) {
            const listElements = this.listModals[ child ].querySelectorAll( '*' );
            for ( let child2 = 0; child2 < listElements.length; child2++ ) {
                if ( listElements[ child2 ] === this.button.nativeElement ) {
                    return this.parentElement = this.listModals[ child ];
                }
            }
        }
    }
}

