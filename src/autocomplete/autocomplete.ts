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
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output, Renderer2,
    ViewChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { ComponentHasModelBase } from '../core/base/component-has-model.base';

import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { TabIndexService } from '../form/tabIndex.service';
import { KeyEvent } from '../core/enums/key-events';

let globalZindex = 1;

@Component( {
    selector : 'tl-autocomplete',
    templateUrl : './autocomplete.html',
    styleUrls : [ './autocomplete.scss' ],
    changeDetection : ChangeDetectionStrategy.OnPush,
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
        { provide : NG_VALUE_ACCESSOR, useExisting : forwardRef( () => TlAutoComplete ), multi : true }
    ]
} )

export class TlAutoComplete extends ComponentHasModelBase implements AfterViewInit {

    @Input( 'data' ) data: Array<any>;

    @Input() labelPlacement: string;

    @Input() labelSize: number;

    @Input() label: string;

    @Input() clearButton: boolean;

    // @Input() minLengthSearch = 1;

    @Input() id = '';

    @Input() text = '';

    @Input() value = '';

    @Input() query: any[] = [];

    @Input() display: any[] = [];

    @Input() valueField = [];

    @Input() return: any[] = [];

    @Input() itemAmount = 5;

    @ViewChild( 'autocomplete' ) autocomplete;

    @ViewChild( 'list' ) list;

    @Output() clear: EventEmitter<any> = new EventEmitter();

    public zIndex = 0;

    private datasource: any[] = [];

    private cursor = -1;

    private showHide: boolean;

    private dataType: string;

    private noDataFound: boolean;

    private lastValue: string;

    private topRow: number;

    private lastRow: number;

    private itemSelected: any[] = [];

    constructor( tabIndexService: TabIndexService,
                 public idService: IdGeneratorService,
                 public nameService: NameGeneratorService,
                 private change: ChangeDetectorRef ) {
        super( tabIndexService, idService, nameService );
        this.labelPlacement = 'left';
        this.topRow = 0;
        this.lastRow = this.itemAmount - 1;
        this.noDataFound = false;
        this.showHide = false;
        this.dataType = null;
    }

    ngAfterViewInit(): void {
        this.setElement( this.autocomplete, 'autocomplete' );
        this.updateDataSource( this.getData() );
    }

    clearField() {
        // verificar writevalue pra limpar
        this.modelValue = '';
        this.showHide = false;
        this.autocomplete.nativeElement.value = '';
        this.autocomplete.nativeElement.focus();
        this.clear.emit();
    }

    getAndSetZIndex() {
        this.zIndex = globalZindex++;
        return this.zIndex;
    }

    updateDataSource( data ) {
        data.forEach( ( value ) => {
            this.datasource.push( value );
        } );
    }

    getData() {
        if ( ( this.data[ 0 ] === undefined ) ) {
            throw new EvalError( 'You must pass some valid data to the DATA property of the tl-autocomplete element.' );
        }
        if ( (typeof this.data[ 0 ] === 'object') && ( (this.valueField.length <= 0)
            || (this.display.length <= 0) || (this.query.length <= 0) ) ) {
            throw new EvalError( 'You must use the DISPLAY, ONSELECT and QUERY properties' +
                ' when using the DATA property of the tl-autocomplete element.' );
        }
        if ( typeof this.data[ 0 ] === 'object' && ( (this.valueField[ 0 ].length <= 0)
            || (this.display[ 0 ].length <= 0) || (this.query[ 0 ].length <= 0) ) ) {
            throw new EvalError( 'You must pass some valid value to the DISPLAY, ONSELECT and QUERY properties' +
                ' when using the DATA property of the tl-autocomplete element.' );
        }
        if ( (typeof this.data[ 0 ] === 'string') && ((this.query.length !== 0) ||
            (this.display.length !== 0) || (this.valueField.length !== 0)) ) {
            throw new EvalError( 'You should not use the QUERY, DISPLAY and ONSELECT properties' +
                ' when using the SIMPLEDATA of the tl-autocomplete element.' );
        }
        this.checkOnSelect();
        this.checkQuery();
        this.checkDisplay();
        if ( typeof this.data[ 0 ] === 'string' ) {
            const simpleData = [];
            this.data.forEach( ( value ) => {
                simpleData.push( { 'value' : value } );
            } );
            this.display = [ 'value' ];
            this.query = [ 'value' ];
            this.valueField = [ 'value' ];
            this.dataType = 'simpleData';
            return simpleData;
        }
        return this.data;
    }

    getCursor() {
        for ( let item = 0; item < this.list.nativeElement.children.length; item++ ) {
            if ( this.list.nativeElement.children[ item ].classList[ 1 ] === 'activeItem' ) {
                this.cursor = item;
            }
        }
    }

    onListOpened( $event ) {
        if ( this.showHide ) {
            this.getAndSetZIndex();
            this.getCursor();
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
                    this.onEnter( $event );
                    $event.stopPropagation();
                    break;
            }
        }
    }

    stopPropagationAndPreventDefault( $event ) {
        $event.stopPropagation();
        $event.preventDefault();
    }

    onArrowDown() {
        if ( this.cursor < this.list.nativeElement.children.length - 1 ) {
            this.removeActive();
            this.cursor = this.cursor + 1;
            if ( this.cursor > this.lastRow ) {
                this.topRow += 1;
                this.lastRow += 1;
                this.list.nativeElement.scrollTop += 36;
            }
            this.list.nativeElement.children[ this.cursor ].classList.add( 'activeItem' );
            return;
        }
    }

    onArrowUp() {
        if ( this.cursor > 0 && this.cursor !== -1 ) {
            this.removeActive();
            this.cursor = this.cursor - 1;
            if ( this.cursor < this.topRow ) {
                this.topRow -= 1;
                this.lastRow -= 1;
                this.list.nativeElement.scrollTop -= 36;
            }
            this.list.nativeElement.children[ this.cursor ].classList.add( 'activeItem' );
            return;
        }
    }

    onEnter( $event ) {
        this.datasource.forEach( ( value, index, array ) => {
            if ( index === this.cursor ) {
                this.itemSelected = value;
                if ( this.itemSelected[ this.valueField[ 0 ] ] === null || this.itemSelected[ this.valueField[ 0 ] ] === '' ) {
                    return this.writeValue( '' );
                }
                const selectValue = this.itemSelected[ this.valueField[ 0 ] ];
                this.lastValue = selectValue.toLowerCase();
                this.modelValue = this.itemSelected;
                setTimeout( () => {
                    this.autocomplete.nativeElement.value = this.itemSelected[ this.valueField[ 0 ] ];
                }, 1 );
                this.change.detectChanges();
            }
        } );
        this.showHide = false;
    }

    selectItem( $event, i ) {
        this.cursor = i;
        this.onEnter( $event );
        this.autocomplete.nativeElement.focus();
    }

    checkOnSelect() {
        this.valueField.forEach( ( queryValue ) => {
            let numberOfError = 0;
            Object.keys( this.data[ 0 ] ).forEach( ( dataKey ) => {
                if ( dataKey !== queryValue ) {
                    numberOfError = numberOfError + 1;
                }
            } );
            if ( numberOfError === Object.keys( this.data[ 0 ] ).length ) {
                throw new EvalError( 'You must pass a valid value to a ONSELECT property that exists in the DATA property.' );
            }
        } );
    }

    checkQuery() {
        this.query.forEach( ( queryValue ) => {
            let numberOfError = 0;
            Object.keys( this.data[ 0 ] ).forEach( ( dataKey ) => {
                if ( dataKey !== queryValue ) {
                    numberOfError = numberOfError + 1;
                }
            } );
            if ( numberOfError === Object.keys( this.data[ 0 ] ).length ) {
                throw new EvalError( 'You must pass a valid value to a QUERY property that exists in the DATA property.' );
            }
        } );
    }

    checkDisplay() {
        this.display.forEach( ( queryValue ) => {
            let numberOfError = 0;
            Object.keys( this.data[ 0 ] ).forEach( ( dataKey ) => {
                if ( dataKey !== queryValue ) {
                    numberOfError = numberOfError + 1;
                }
            } );
            if ( numberOfError === Object.keys( this.data[ 0 ] ).length ) {
                throw new EvalError( 'You must pass a valid value to a DISPLAY property that exists in the DATA property.' );
            }
        } );
    }

    simpleDataSearch( searchValue ) {
        searchValue = searchValue.toLowerCase();
        if ( this.itemSelected && this.itemSelected.length > 0 ) {
            if ( this.itemSelected[ this.text ] === searchValue ) {
                this.showHide = false;
                return;
            }
        }
        const newValue = searchValue.trim();
        if ( !newValue || newValue.length <= 0 || newValue === '' || newValue === 'undefined' || newValue === null ) {
            this.noDataFound = false;
            this.lastValue = '';
            this.itemSelected = [];
            this.removeActive();
            this.datasource = this.data;
            return this.showHide = false;
        }
        this.showHide = true;
        this.getAndSetZIndex();
        const filtredData = [];
        this.data.forEach( ( dataValue ) => {
            if ( dataValue.toLowerCase().indexOf( searchValue.toLowerCase() ) !== -1 ) {
                this.noDataFound = false;
                filtredData.push( { value : dataValue } );
            }
        } );
        this.datasource = this.checkDuplicateItems( filtredData );
        if ( this.datasource.length <= 0 && this.modelValue ) {
            this.showHide = true;
            this.itemSelected = [];
            this.lastValue = searchValue;
            this.noDataFound = true;
            this.removeActive();
            return;
        }
        this.change.detectChanges();
        if ( (this.datasource.length > 0) ) {
            this.itemSelected = [];
            this.list.nativeElement.scrollTop = 0;
            this.topRow = 0;
            this.noDataFound = false;
            this.lastRow = this.itemAmount - 1;
            this.removeActive();
            this.lastValue = searchValue;
            this.setFirstActive();
        }
    }

    searchItem( searchValue, $event ) {
        // 65 a 90 de A-Z
        // 48 a 57 96 a 105 de 0-9
        // 32 SPACE
        // 13 ENTER
        // 8 Backspace - 46 delete
        if ( ($event.which >= 48 && $event.which <= 57) || ($event.which === 32 || $event.which === 8 || $event.which === 46)
            || ($event.which >= 65 && $event.which <= 90) || ($event.which >= 96 && $event.which <= 105) ) {
            searchValue = searchValue.toLowerCase();
            if ( this.dataType != null ) {
                return this.simpleDataSearch( searchValue );
            }
            if ( this.itemSelected ) {
                if ( this.itemSelected[ this.text ] === searchValue ) {
                    this.showHide = false;
                    return;
                }
            }
            const newValue = searchValue.trim();
            if ( !newValue || newValue.length <= 0 || newValue === '' || newValue === 'undefined' || newValue === null ) {
                this.noDataFound = false;
                this.lastValue = '';
                this.itemSelected = [];
                this.removeActive();
                this.datasource = this.data;
                return this.showHide = false;
            }
            this.showHide = true;
            this.getAndSetZIndex();
            this.searchInDatasource( searchValue );

            if ( this.datasource.length <= 0 && this.modelValue ) {
                this.showHide = true;
                this.itemSelected = [];
                this.lastValue = searchValue;
                this.noDataFound = true;
                this.removeActive();
            }
            if ( (this.lastValue !== searchValue) && (this.datasource.length > 0) ) {
                this.itemSelected = [];
                setTimeout( () => {
                    this.list.nativeElement.scrollTop = 0;
                    this.topRow = 0;
                    this.noDataFound = false;
                    this.lastRow = this.itemAmount - 1;
                    this.removeActive();
                    this.setFirstActive();
                    this.lastValue = searchValue;
                }, 0 );
            }
        }
    }

    closeList( $event ) {
        this.showHide = false;
    }

    searchInDatasource( value ) {
        const filtredData = [];
        this.data.forEach( ( dataValue ) => {
            this.query.forEach( ( queryValue ) => {
                if ( dataValue[ String( queryValue ) ].toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                    this.noDataFound = false;
                    filtredData.push( dataValue );
                }

            } );
        } );
        return this.datasource = this.removeDuplicateItems( filtredData );
    }

    removeActive() {
        for ( let item = 0; item < this.list.nativeElement.children.length; item++ ) {
            this.list.nativeElement.children[ item ].classList.remove( 'activeItem' );
        }
    }

    setFirstActive() {
        this.list.nativeElement.children[ 0 ].classList.add( 'activeItem' );
    }

    removeDuplicateItems( data ) {
        let newData;
        newData = data.filter( function ( item, index, inputArray ) {
            return inputArray.indexOf( item ) === index;
        } );
        return newData;
    }

    checkDuplicateItems( data ) {
        let newData;
        newData = data.filter( function ( item, index, inputArray ) {
            if ( (inputArray.indexOf( item ) === index) === false ) {
                throw new EvalError( 'You must pass a UNIQUE VALUE to the data array when using the SIMPLEDATA type.' );
            }
        } );
        return data;
    }

    calcHeightItem() {
        if ( this.itemAmount >= this.datasource.length ) {
            return { 'height' : 'auto' };
        } else {
            return { 'height' : (36) * this.itemAmount + 'px' };
        }
    }

}
