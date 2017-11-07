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
    AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, Input, Renderer2, ViewChild
} from '@angular/core';

import { style, transition, trigger, animate, state } from '@angular/animations';

import { KeyEvent } from '../core/enums/key-events';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { ComponentHasModelBase } from '../core/base/component-has-model.base';
import { TabIndexService } from '../form/tabIndex.service';
import { MakeProvider } from '../core/base/value-accessor-provider';

let globalZindex = 1;

@Component( {
    selector: 'tl-dropdown-list',
    templateUrl: './dropdownlist.html',
    styleUrls: [ './dropdownlist.scss' ],
    animations: [
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
        [ MakeProvider(TlDropDownList) ]
    ]
} )

export class TlDropDownList extends ComponentHasModelBase implements AfterViewInit, AfterContentInit {

    @Input( 'data' ) data: Array<any>;

    @Input( 'value' ) value = 'value';

    @Input( 'text' ) text = 'text';

    @Input( 'icon' ) icon = null;

    @Input( 'label' ) label: string;

    @Input('showOnlyIcon') showOnlyIcon = false;

    @Input( 'disabled' ) disabled = null;

    @Input( 'labelPlacement' ) labelPlacement = 'left';

    @Input( 'labelSize' ) labelSize: string;

    @Input( 'height' ) height = 37;

    @Input( 'width' ) width = 83;

    @Input( 'placeholder' ) placeholder = null;

    @Input( 'placeholderIcon' ) placeholderIcon = 'ion-navicon-round';

    @Input( 'scroll' ) scroll = null;

    @ViewChild( 'list' ) list;

    @ViewChild( 'defaultPlaceholder' ) placeholderDiv;

    @ViewChild( 'dropdown' ) dropdown;

    @ViewChild( 'dropdownShow' ) dropdownShow;

    @ViewChild( 'wrapper' ) wrapper;

    public zIndex = 0;

    private topPosition = null;

    private leftPosition = '0px';

    private position = 'absolute';

    private showHide = false;

    private children = -1;

    private itemSelected: any[];

    private datasource: any[] = [];

    private widthList = 0;

    constructor( private _renderer: Renderer2,
                 public tabIndexService: TabIndexService,
                 public idService: IdGeneratorService,
                 private changeDectection: ChangeDetectorRef,
                 public nameService: NameGeneratorService ) {
        super( tabIndexService, idService, nameService );
    }

    ngAfterContentInit() {
        setTimeout(() => {
            this.widthList = this.wrapper.nativeElement.clientWidth;
        })
    }

    ngAfterViewInit() {
        this.setElement( this.dropdown, 'dropdown' );

        this.updateDataSource( this.getData() );

        this.isNumber( this.width, 'width' );
        this.isNumber( this.scroll, 'scroll' );
        this.isBoolean( this.disabled, 'disabled' );
        this.isString( this.placeholder, 'placeholder' );


        this._renderer.listen( document, 'mousedown', ( event ) => {
            if ( this.isNotListDropdown(event) ) {
                this.showHide = false;
                this.changeDectection.markForCheck();
            }
        });

        setTimeout( () => {
            if ( this.componentModel.model ) {
                this.selectValueModelLoaded();
                this.selectItemListLoaded();
            }
        }, 1 );
    }

    selectValueModelLoaded() {
        this.datasource.forEach( ( item, index, array ) => {
            if ( this.componentModel.model === item[ this.value ] ) {
                this.setValueInputAsLabel( item );
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
        data.forEach( ( value ) => {
            Object.keys( value ).forEach( ( value2 ) => {
                if ( (value2 !== this.text) && (value2 !== this.value) && (value2 !== this.icon) ) {
                    throw new EvalError( 'You must pass a valid value to TEXT/VALUE properties.' );
                }
            } );
            this.datasource.push( value );
        } );
    }

    calcHeightItem() {
        this.isNumber( this.height, 'height' );
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

    isNumber( value, propertyName ) {
        if ( ( typeof value !== 'number' && value !== null ) || value === undefined ) {
            throw new EvalError( 'You must pass a numeric value to ' + propertyName.toUpperCase() + '' +
                ' property of the tl-dropdown-list element.' );
        }
        return value;
    }

    isBoolean( value, propertyName ) {
        if ( ( typeof value !== 'boolean' && value !== null ) || value === undefined ) {
            throw new EvalError( 'You must pass a boolean value to ' + propertyName.toUpperCase() + '' +
                ' property of the tl-dropdown-list element.' );
        }
    }

    isString( value, propertyName ) {
        if ( ( typeof value !== 'string' && value !== null ) || value === undefined ) {
            throw new EvalError( 'You must pass a string value to ' + propertyName.toUpperCase() + '' +
                ' property of the tl-dropdown-list element.' );
        }
    };

    isNotListDropdown(event) {
        if (!event.target.parentElement) {
            return false;
        }
        if ( ( event.target.nodeName !== 'LI') && ( event.target.className.indexOf('-placeholder') < 0 )) {
            if ( (event.target.parentElement.nodeName !== 'LI') && ( event.target.parentElement.className.indexOf('-placeholder') < 0) ) {
                return true;
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
                        this.changeShowStatus($event);
                    } else {
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
            if ( (value[ this.text ]).trim() === document.activeElement.textContent.trim() ) {
                this.itemSelected = value;
                if ( this.itemSelected[ this.value ] === null || this.itemSelected[ this.value ] === '' ) {
                    this.clearModelComponent();
                }
                this.setValueInputAsLabel( this.itemSelected );
                this.setModelComponent( this.itemSelected[ this.value ] );
            }
        } );
    }

    placeholderEnter( $event ) {
        $event.preventDefault();
        $event.stopPropagation();
        switch ( $event.keyCode ) {
            case KeyEvent.ENTER:
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
        this.setModelComponent( this.itemSelected[ this.value ] );
        this.setValueInputAsLabel( this.itemSelected );
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
            this.itemSelected = null;
            this.clearModelComponent();
            if ( this.showHide ) {
                this.placeholderDiv.nativeElement.focus();
            }
            this.dropdown.nativeElement.value = this.placeholder;
            this.setPlaceholderIcon();

        }
        if ( this.children > 0 && this.children !== -1 ) {
            this.children = this.children - 1;
            this.list.nativeElement.children[ this.children ].focus();
            this.onChangeItem();
        }
    }

    changeShowStatus(event) {
        event.stopPropagation();
        this.setPositionListItens(event);

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

    setPositionListItens(event) {
        if (this.showOnlyIcon) {
            const target = event.path.filter( (value) => {
                return value.className === 'tl-dropdown-list-box';
            });

            this.topPosition = event.clientY + ( target[0].offsetHeight - event.layerY) + 'px' ;
            this.leftPosition = event.clientX  - event.layerX  + 'px';
            this.position = 'fixed';
        }
    }

    selectOption( item, index ) {
        this.showHide = false;
        this.itemSelected = item;
        this.children = index;
        this.setModelComponent( item[ this.value ] );
        this.setValueInputAsLabel( item );
        this.dropdown.nativeElement.focus();

    }

    selectPlaceholder() {
        this.showHide = false;
        this.dropdown.nativeElement.value = this.placeholder;
        this.setPlaceholderIcon();
        this.clearModelComponent();
        this.placeholderDiv.nativeElement.focus();
        this.itemSelected = null;
        this.setFocusOnDropdown();
        this.children = -1;
    }

    setValueInputAsLabel( item ) {
        setTimeout( () => {
            this.dropdown.nativeElement.value = item[ this.text ];
            this.setIconClass(item[ this.icon ]);
        }, 1 );
    }

    setIconClass(item) {
        if (this.showOnlyIcon) {
            const classList = item.split(' ');
            this._renderer.removeAttribute(this.dropdownShow.nativeElement, 'class');
            if (classList.length > 0) {
                classList.forEach((value) => {
                    this._renderer.addClass(this.dropdownShow.nativeElement, value)
                });
                return;
            }
            this._renderer.addClass(this.dropdownShow.nativeElement, item);
        }
    }

    setModelComponent( value ) {
        this.writeValue( value );
    }

    clearModelComponent() {
        this.writeValue( '' );
    }

    getData() {
        if ( ( this.data[ 0 ] === undefined ) ) {
            throw new EvalError( 'You must pass some valid data to the DATA property of the tl-dropdown-list element.' );
        }
        if ( typeof this.data[ 0 ] === 'object' && (this.text === undefined || this.value === undefined) ) {
            throw new EvalError( 'You must pass a string value to the TEXT and VALUE properties of the tl-dropdown-list element.' );
        }
        if ( typeof this.data[ 0 ] === 'string' && (this.text !== 'text' || this.value !== 'value') ) {
            throw new EvalError( 'You should not pass a value to the TEXT and VALUE properties' +
                ' when using the SIMPLEDATA property of the tl-dropdown-list element.' );
        }
        if ( typeof this.data[ 0 ] === 'string' ) {
            const simpleData = [];
            this.data.forEach( ( value ) => {
                simpleData.push( { text : value, value : value } );
            } );
            return simpleData;
        }
        return this.data;
    }

    setFocusOnDropdown() {
        this.dropdown.nativeElement.focus();
    }

    setPlaceholderIcon() {
        if (this.showOnlyIcon) {
            this.setIconClass(this.placeholderIcon);
        }
    }

}
