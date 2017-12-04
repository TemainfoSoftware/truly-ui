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
import {
    Component, ElementRef, Input, ViewChild, Output, EventEmitter, AfterViewInit,
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
    styleUrls: [ './button.scss' ]
} )
export class TlButton extends ComponentDefaultBase implements AfterViewInit {

    @Input() text: string = '';
    
    @Input() iconAddonBefore: string = '';

    @Input() buttonAddonBeforeClass: string = '';

    @Input() iconAddonAfter: string = '';

    @Input() buttonAddonAfterClass: string = '';

    @Input() iconBeforeText: string = '';

    @Input() iconBeforeTextClass: string = '';

    @Input() iconAfterText: string = '';

    @Input() iconAfterTextClass: string = '';

    @Input() height = '30px';

    @Input() width: string = '120px';

    @Input() defaultFocus: boolean = false;

    @Input() disabled: boolean = null;

    @Input() toggle: boolean = false;

    @Input() toggleClass: string = '';

    @Input() toggleClassName: string = '';

    @Input() colorIconBefore: string = '';

    @Input() colorIconAfter: string = '';

    @Input() buttonClass: string = '';

    @Input() mdResult: ModalResult;

    @Input() formResult;

    @Output() selected: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild( 'tlbutton' ) buttonElement: ElementRef;

    private _buttonSelected: boolean;

    @Input() set buttonSelected( value: boolean ) {
        this._buttonSelected = value;
        this.executeToggle();
    }

    constructor( public button: ElementRef, public modalService: ModalService,
                 tabIndexService: TabIndexService, idService: IdGeneratorService, nameService: NameGeneratorService ) {
        super( tabIndexService, idService, nameService );
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
                this.toggleClassName = this.toggleClass ? this.toggleClass : '-toggle';
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
        return new Promise((resolve, reject) => {
            const listModals = document.querySelectorAll( 'tl-modal' );
            if ( !this.mdResult || ModalResult.MRCUSTOM ) {
                return;
            }
            if ( listModals.length > 0 ) {
                this.modalService.execCallBack( {
                    mdResult : ModalResult[ this.mdResult ],
                    formResult : this.formResult
                }, this.findParentOfChildren( listModals ) ).then(() => {
                    resolve();
                });
            }
        });
    }

    findParentOfChildren( listModals ) {
        let parent;
        for ( let child = 0; child < listModals.length; child++ ) {
            const listElements = listModals[ child ].querySelectorAll( '*' );
            for ( let child2 = 0; child2 < listElements.length; child2++ ) {
                if ( listElements[ child2 ] === this.button.nativeElement ) {
                    return parent = listModals[ child ];
                }
            }
        }
    }
}

