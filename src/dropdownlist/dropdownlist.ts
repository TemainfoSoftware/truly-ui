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
    Component, forwardRef, Input, Renderer2, ViewChild
} from '@angular/core';

import { style, transition, trigger, animate, state } from '@angular/animations';

import { KeyEvent } from '../core/enums/key-events';
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
                state( 'true', style( { opacity : 1, transform : 'translate(0%,0%)' } ) ),
                state( 'false', style( { opacity : 0, transform : 'translate(0%,-5%)', flex : '0' } ) ),
                transition( '1 => 0', animate( '200ms' ) ),
                transition( '0 => 1', animate( '200ms' ) ),
            ]
        )
    ],
    providers : [
        { provide : NG_VALUE_ACCESSOR, useExisting : forwardRef( () => TlDropDownList ), multi : true }
    ]
} )

export class TlDropDownList extends ComponentHasModelBase implements AfterViewInit {

    @Input( 'data' ) data: Array<any>;

    @Input( 'value' ) value: string;

    @Input( 'text' ) text: string;

    @Input( 'label' ) label: string;

    @Input( 'disabled' ) disabled: boolean;

    @Input( 'labelPlacement' ) labelPlacement = 'left';

    @Input( 'labelSize' ) labelSize: string;

    @Input( 'height' ) height: number;

    @Input( 'width' ) width: number;

    @Input( 'placeholder' ) placeholder = null;

    @Input( 'scroll' ) scroll: number;

    @ViewChild( 'list' ) list;

    @ViewChild( 'defaultPlaceholder' ) placeholderDiv;

    @ViewChild( 'dropdown' ) dropdown;

    public zIndex = 0;

    private showHide: boolean;

    private children = -1;

    private itemSelected: any[];

    private datasource: any[] = [];

    constructor( private _renderer: Renderer2,
                 tabIndexService: TabIndexService,
                 public idService: IdGeneratorService,
                 public nameService: NameGeneratorService ) {
        super( tabIndexService, idService, nameService );
        this.showHide = false;
        this.width = 83;
        this.height = 37;
        this.text = 'text';
        this.value = 'value';
        this.disabled = null;
        this.scroll = null;
    }


    ngAfterViewInit() {
        this.setElement( this.dropdown, 'dropdown' );
        this.setTabIndex( this.dropdown );
        this.updateDataSource( this.getData() );

        this._renderer.listen( document, 'click', ( event ) => {
            this.showHide = false;
        } );
        setTimeout( () => {
            if ( this.componentModel.model ) {
                this.selectValueModelLoaded();
                this.selectItemListLoaded();
            }
        }, 1 );
    }

    checkWidth( width ) {
        if ( typeof width !== 'number' || width === undefined ) {
            throw new EvalError( 'You must pass a NUMERIC VALUE to width property of the dropdownlist element.' );
        }
    }

    selectValueModelLoaded() {
        this.datasource.forEach( ( item, index, array ) => {
            if ( this.componentModel.model === item[ this.value ] ) {
                this.dropdown.nativeElement.value = item[ this.text ];
                this.itemSelected = item;
            }
        } );
    }

    selectItemListLoaded() {
        for ( let i = 0; i < this.list.nativeElement.children.length; i++ ) {
            if ( this.dropdown.nativeElement.value === this.list.nativeElement.children[ i ].innerHTML.trim() ) {
                this.children = i;
            }
        }
    }

    updateDataSource( data ) {
        data.forEach( ( value, index, array ) => {
            this.datasource.push( value );
        } );
    }

    calcHeightItem() {
        if ( this.showHide && !this.disabled ) {

            if ( (!this.scroll) ) {
                if ( (this.datasource.length > 10) ) {
                    return { 'height' : (10 * this.height) + 'px', 'overflow-y' : 'scroll' };
                } else {
                    return { 'height' : 'auto', 'overflow-y' : 'visible' };
                }
            } else {
                if ( this.scroll > this.datasource.length ) {
                    this.scroll = this.datasource.length;
                }
                return { 'height' : (this.scroll * this.height) + 'px', 'overflow-y' : 'scroll' };
            }
        }
    }

    onListOpened( $event ) {
        switch ( $event.keyCode ) {
            case KeyEvent.ARROWDOWN:
                this.onArrowDown();
                this.stopPropagationAndPreventDefault( $event );
                break;
            case KeyEvent.ARROWUP:
                this.onArrowUp();
                this.stopPropagationAndPreventDefault( $event );
                break;
            case KeyEvent.ENTER:
                $event.stopPropagation();
                this.onEnter( $event );
                break;
            case KeyEvent.ESCAPE:
                this.onEscape( $event );
                break;
            case KeyEvent.SPACE:
                this.stopPropagationAndPreventDefault( $event );
                break;
            case KeyEvent.TAB:
                $event.preventDefault();
                this.onEscape( $event );
                break;
        }
    }

    onListClosed( $event ) {
        if ( !this.disabled ) {
            switch ( $event.keyCode ) {
                case KeyEvent.ARROWDOWN:
                    this.onArrowDown();
                    this.stopPropagationAndPreventDefault( $event );
                    break;
                case KeyEvent.ARROWUP:
                    this.onArrowUp();
                    this.stopPropagationAndPreventDefault( $event );
                    break;
                case KeyEvent.ENTER:
                    if ( !this.itemSelected ) {
                        this.changeShowStatus();
                    } else {
                        this.onKeyInput( $event );
                        this.onEnter( $event );
                    }
                    break;
                case KeyEvent.SPACE:
                    this.onSpace();
                    this.stopPropagationAndPreventDefault( $event );
                    break;
            }
        }
    }

    stopPropagationAndPreventDefault( $event ) {
        $event.stopPropagation();
        $event.preventDefault();
    }

    onSpace() {
        if ( !this.showHide ) {
            this.showHide = true;
            this.setTimeoutWithZIndexAndFocusOnElement();
        }
    }

    setFocusOnElement() {
        if ( this.placeholder && this.children === -1 ) {
            this.placeholderDiv.nativeElement.focus();
            return;
        }
        if ( this.children === -1 ) {
            this.children = 0;
        }
        this.list.nativeElement.children[ this.children ].focus();
    }

    onEscape( $event ) {
        $event.stopPropagation();
        if ( !this.componentModel.model && !this.placeholder ) {
            this.onChangeItem();
        }
        this.showHide = false;
        this.setFocusOnDropdown();
    }

    onEnter( $event ) {
        if ( !this.showHide ) {
            if ( this.itemSelected ) {
                $event.preventDefault();
                return;
            }
            if ( !this.itemSelected || this.placeholder || this.itemSelected === null || this.itemSelected === undefined ) {
                this.setTimeoutWithZIndexAndFocusOnElement();
                this.showHide = true;
                return;
            }
        }
        if ( !this.componentModel.model ) {
            this.onChangeItem();
        }
        this.showHide = false;
        this.setFocusOnDropdown();
    }

    setTimeoutWithZIndexAndFocusOnElement() {
        setTimeout( () => {
            this.getAndSetZIndex();
            this.setFocusOnElement();
        }, 0 );
    }

    onChangeItem() {
        if ( !this.showHide ) {
            this.onShowHideFalse();
            return;
        }
        this.datasource.forEach( ( value, index, array ) => {
            if ( value[ this.text ] === document.activeElement.innerHTML.trim() ) {
                this.itemSelected = value;
                if ( this.itemSelected[ this.value ] === null || this.itemSelected[ this.value ] === '' ) {
                    this.clearModelComponent();
                }
                this.dropdown.nativeElement.value = this.itemSelected[ this.text ];
                this.setModelComponent( this.itemSelected[ this.value ] );
            }

        } );
    }

    placeholderEnter( $event ) {
        $event.preventDefault();
        switch ( $event.keyCode ) {
            case KeyEvent.ENTER:
                $event.stopPropagation();
                this.itemSelected = null;
                this.setFocusOnDropdown();
                this.showHide = false;
                break;
            case KeyEvent.ARROWDOWN:
                this.onArrowDown();
                break;
            case KeyEvent.TAB:
                this.onEscape( $event );
                break;
            case KeyEvent.ESCAPE:
                this.onEscape( $event );
                break;
        }
    }

    onShowHideFalse() {
        if ( this.children === -1 ) {
            this.children = 0;
        }
        this.itemSelected = this.datasource[ this.children ];
        if ( this.itemSelected[ this.value ] === null || this.itemSelected[ this.value ] === '' ) {
            this.clearModelComponent();
        }
        this.dropdown.nativeElement.value = this.itemSelected[ this.text ];

        this.setModelComponent( this.itemSelected[ this.value ] );
    }

    onArrowDown() {
        if ( this.children < this.list.nativeElement.children.length - 1 ) {
            this.list.nativeElement.children[ this.children + 1 ].focus();
            this.children = this.children + 1;
            this.onChangeItem();
        }
    }

    onArrowUp() {
        if ( this.placeholder && this.children <= 0 ) {
            this.children = -1;
            this.clearModelComponent();
            this.itemSelected = null;
            if ( this.showHide ) {
                this.placeholderDiv.nativeElement.focus();
            }
            this.dropdown.nativeElement.value = this.placeholder;
        }
        if ( this.children > 0 && this.children !== -1 ) {
            this.children = this.children - 1;
            this.list.nativeElement.children[ this.children ].focus();
            this.onChangeItem();
        }
    }

    changeShowStatus() {
        if ( !this.disabled ) {
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
    }

    getAndSetZIndex() {
        this.zIndex = globalZindex++;
        return this.zIndex;
    }

    selectOption( item, index ) {
        this.showHide = false;
        this.itemSelected = item;
        this.children = index;
        this.dropdown.nativeElement.value = item[ this.text ];
        this.setModelComponent( item[ this.value ] );
        this.dropdown.nativeElement.focus();
    }

    selectPlaceholder() {
        this.showHide = false;
        this.dropdown.nativeElement.value = this.placeholder;
        this.clearModelComponent();

        this.placeholderDiv.nativeElement.focus();
        this.itemSelected = null;
        this.setFocusOnDropdown();
        this.children = -1;
    }

    setModelComponent( value ) {
        this.onChangeCallback( value );
        this.componentModel.model = value;
    }

    clearModelComponent() {
        this.onChangeCallback( '' );
        this.componentModel.model = '';
    }

    getData() {
        if ( ( typeof this.data !== 'object' ) || ( this.data[ 0 ] === undefined )
            || (typeof this.data[ 0 ] === 'string' && (this.text !== 'text' || this.value !== 'value') ) ) {
            throw new EvalError( 'You must pass some data to the data property of the dropdownlist element.' );
        }
        if ( typeof this.data[ 0 ] === 'string' ) {
            const simpleData = [];
            this.data.forEach( ( value, index, array ) => {
                simpleData.push( { text : value, value : value } );
            } );
            return simpleData;
        }
        return this.data;
    }

    setFocusOnDropdown() {
        this.dropdown.nativeElement.focus();
    }

}
