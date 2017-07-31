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
    AfterViewInit,
    Component, EventEmitter, forwardRef, Input, Output, Renderer2, ViewChild
} from '@angular/core';

import { style, transition, trigger, animate } from '@angular/animations';

import { KeyEvent } from '../core/enums/key-events';
import { DataMetadata } from '../core/types/datametadata';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentHasModelBase } from '../core/base/component-has-model.base';
import { TabIndexService } from '../form/tabIndex.service';

let globalZindex = 1;

@Component( {
    selector : 'tl-dropdown-list',
    templateUrl : './dropdownlist.html',
    styleUrls : [ './dropdownlist.scss' ],
    animations : [
        trigger(
            'enterAnimation', [
                transition( ':enter', [
                    style( { opacity : 0, transform : 'translate(0%,-5%)', flex : '0' } ),
                    animate( '200ms', style( { opacity : 1, transform : 'translate(0%,0%)' } ) )
                ] ),
                transition( ':leave', [
                    style( { opacity : 1, transform : 'translate(0%,0%)' } ),
                    animate( '200ms', style( { opacity : 0, transform : 'translate(0%,-5%)' } ) )
                ] )
            ]
        )
    ],
    providers : [
        { provide : NG_VALUE_ACCESSOR, useExisting : forwardRef( () => TlDropDownList ), multi : true }
    ]
} )
export class TlDropDownList extends ComponentHasModelBase implements AfterViewInit {

    @Input( 'data' ) data: DataMetadata | Array<any>;

    @Input( 'value' ) value: string;

    @Input( 'text' ) text: string;

    @Input( 'label' ) label: string;

    @Input( 'labelPlacement' ) labelPlacement = 'left';

    @Input( 'labelSize' ) labelSize: string;

    @Input( 'selectHeight' ) selectHeight: number;

    @Input( 'placeholder' ) placeholder = null;

    @Input( 'scroll' ) scroll: number;

    @Output( 'itemSelect' ) itemSelect: EventEmitter<any> = new EventEmitter();

    @ViewChild( 'list' ) list;

    @ViewChild( 'defaultPlaceholder' ) placeholderDiv;

    @ViewChild( 'inputDropdown' ) inputDropdown;

    @ViewChild( 'dropbox' ) dropbox;

    @ViewChild( 'model' ) componentModel;

    public zIndex = 0;

    private showHide: boolean;

    private children = -1;

    private itemSelected: any[];

    private datasource: any[] = [];

    private elementoAtivo;

    constructor( private _renderer: Renderer2,
                 tabIndexService: TabIndexService,
                 public idService: IdGeneratorService,
                 public nameService: NameGeneratorService ) {
        super( tabIndexService, idService, nameService );
        this.showHide = false;
        this.selectHeight = 39;
    }

    ngAfterViewInit() {
        this.setElement( this.dropbox, 'dropdown' );
        this.setTabIndex( this.dropbox );
        this.updateDataSource( this.getData() );
        this._renderer.listen( document, 'click', ( event ) => {
            this.showHide = false;
        } );
    }

    updateDataSource( data ) {
        data.forEach( ( value2, index, array ) => {
            this.datasource.push( value2 );
        } );
    }

    calcHeightItem() {
        if ( (!this.scroll) ) {
            if ( (this.datasource.length > 10) ) {
                return { 'height' : (10 * this.selectHeight) + 'px', 'overflow-y' : 'scroll' };
            } else {
                return { 'height' : 'auto', 'overflow-y' : 'visible' };
            }
        } else {
            return { 'height' : (this.scroll * this.selectHeight) + 'px', 'overflow-y' : 'scroll' };
        }
    }

    onKeyDownList( $event ) {
        switch ( $event.keyCode ) {
            case KeyEvent.ARROWDOWN:
                this.arrowDown();
                $event.stopPropagation();
                $event.preventDefault();
                break;
            case KeyEvent.ARROWUP:
                this.arrowUp();
                $event.stopPropagation();
                $event.preventDefault();
                break;
            case KeyEvent.ENTER:
                $event.stopPropagation();
                if ( this.showHide ) {
                    this.showHide = false;
                    this.setFocus();
                } else {
                    this.showHide = true;
                    setTimeout( () => {
                        this.getAndSetZIndex();
                        if ( this.children === -1 && this.placeholder ) {
                            this.placeholderDiv.nativeElement.focus();
                        } else if ( this.children === -1 ) {
                            this.children = 0;
                        } else {
                            this.list.nativeElement.children[ this.children ].focus();
                        }
                    }, 0 );
                }
                break;
            case KeyEvent.ESCAPE:
                if ( this.showHide ) {
                    $event.stopPropagation();
                }
                this.showHide = false;
                this.setFocus();
                break;
            case KeyEvent.SPACE:
                $event.stopPropagation();
                $event.preventDefault();
                if ( !this.showHide ) {
                    this.getAndSetZIndex();
                    this.showHide = true;
                }
                setTimeout( () => {
                    this.getAndSetZIndex();
                    if ( this.children === -1 && this.placeholder ) {
                        this.placeholderDiv.nativeElement.focus();
                    } else if ( this.children === -1 ) {
                        this.children = 0;
                    } else {
                        this.list.nativeElement.children[ this.children ].focus();
                    }
                }, 0 );
                break;
        }
    }

    onChangeItem() {
        if ( !this.showHide ) {
            this.onShowHideFalse();
            return;
        }

        this.datasource.forEach( ( value, index, array ) => {
            if ( value[ this.text ] === document.activeElement.innerHTML.trim() ) {
                this.itemSelected = value;
                this.elementoAtivo = document.activeElement;
                if ( this.itemSelected[ this.value ] !== null && this.itemSelected[ this.value ] !== '' ) {
                    this.inputDropdown.nativeElement.value = value[ this.text ];
                    this.componentModel.model = value[ this.value ];
                    this.itemSelect.emit( this.itemSelected );
                } else {
                    this.itemSelect.emit( '' );
                }
            }

        } );
    }

    onShowHideFalse() {
        if ( this.children === -1 ) {
            this.children = 0;
        }
        this.itemSelected = this.datasource[ this.children ];

        if ( this.itemSelected[ this.value ] !== null && this.itemSelected[ this.value ] !== '' ) {
            this.inputDropdown.nativeElement.value = this.itemSelected[ this.text ];
            this.componentModel.model = this.itemSelected[ this.value ];
            this.itemSelect.emit( this.itemSelected );
        } else {
            this.itemSelect.emit( '' );
        }

    }

    arrowDown() {
        if ( this.children < this.list.nativeElement.children.length - 1 ) {
            this.list.nativeElement.children[ this.children + 1 ].focus();
            this.children = this.children + 1;
            this.onChangeItem();
        }
    }

    arrowUp() {
        if ( this.placeholder && this.children === 0 ) {
            this.placeholderDiv.nativeElement.focus();
            this.inputDropdown.nativeElement.value = this.placeholderDiv.nativeElement.innerHTML.trim();
            this.children = -1;
        }
        if ( this.children !== 0 && this.children !== -1 ) {
            this.list.nativeElement.children[ this.children - 1 ].focus();
            this.children = this.children - 1;
            this.onChangeItem();
        }
    }

    changeShowStatus() {
        this.showHide = !this.showHide;
        if ( this.showHide ) {
            setTimeout( () => {
                this.getAndSetZIndex();
                if ( this.children === -1 && this.placeholder ) {
                    this.placeholderDiv.nativeElement.focus();
                } else if ( this.children === -1 ) {
                    this.list.nativeElement.children[ 0 ].focus();
                } else {
                    this.list.nativeElement.children[ this.children ].focus();
                }
            }, 0 );
        }
    }

    getAndSetZIndex() {
        this.zIndex = globalZindex++;
        return this.zIndex;
    }

    selectOption( item, index ) {
        this.itemSelected = item;
        this.children = index;
        if ( this.itemSelected[ this.value ] !== null && this.itemSelected[ this.value ] !== '' ) {
            this.itemSelect.emit( this.itemSelected );
        } else {
            this.itemSelect.emit( '' );
        }
        this.inputDropdown.nativeElement.value = item[ this.text ];
        this.componentModel.model = item[ this.value ];
        this.showHide = false;
        this.dropbox.nativeElement.focus();
    }

    selectPlaceholder() {
        this.inputDropdown.nativeElement.value = this.placeholder;
        this.componentModel.model = '';
        this.placeholderDiv.nativeElement.focus();
        this.itemSelect.emit( this.componentModel.model );
    }

    getData() {
        if ( ( typeof this.data === 'object') && ( this.data[ 0 ] === undefined ) ) {
            throw new EvalError( 'DataSource - Problem!' );
        }
        return this.data;
    }

    setFocus() {
        this.dropbox.nativeElement.focus();
    }

}
