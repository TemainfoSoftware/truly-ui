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
import { AfterViewInit, Component, EventEmitter, forwardRef, Input, Output, Renderer2, ViewChild } from '@angular/core';
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

    @Input() minLengthSearch = 1;

    @Input() id = '';

    @Input() text = '';

    @Input() value = '';

    @Input() query: any[] = [];

    @Input() itemAmount = 5;

    @ViewChild( 'autocomplete' ) autocomplete;

    @ViewChild( 'list' ) list;

    @Output() clear: EventEmitter<any> = new EventEmitter();

    public zIndex = 0;

    private datasource: any[] = [];

    private cursor = -1;

    private showHide: boolean;

    private noDataFound: boolean;

    private lastValue: string;

    private topRow: number;

    private lastRow: number;

    constructor( tabIndexService: TabIndexService,
                 public idService: IdGeneratorService,
                 public nameService: NameGeneratorService ) {
        super( tabIndexService, idService, nameService );
        this.labelPlacement = 'left';
        this.topRow = 0;
        this.lastRow = this.itemAmount - 1;
        this.noDataFound = false;
    }

    ngAfterViewInit(): void {
        this.setElement( this.autocomplete, 'autocomplete' );
        this.updateDataSource( this.data );
        this.showHide = false;
    }

    clearField() {
        this.modelValue = '';
        this.autocomplete.nativeElement.value = '';
        this.autocomplete.nativeElement.focus();
        this.clear.emit();
    }

    getAndSetZIndex() {
        this.zIndex = globalZindex++;
        return this.zIndex;
    }

    updateDataSource( data ) {
        data.forEach( ( value, index, array ) => {
            this.datasource.push( value );
        } );
    }

    getCursor() {
        for ( let item = 0; item < this.list.nativeElement.children.length; item++ ) {
            if ( this.list.nativeElement.children[ item ].classList[ 1 ] === 'activeItem' ) {
                this.cursor = item;
            }
        }
    }

    onKeyDown( $event ) {
        this.getAndSetZIndex();
        this.getCursor();
        if ( ($event.keyCode === KeyEvent.ARROWUP) || ($event.keyCode === KeyEvent.ARROWDOWN) ) {
            $event.preventDefault();
            if ( $event.keyCode === KeyEvent.ARROWDOWN ) {
                if ( this.cursor < this.list.nativeElement.children.length - 1 ) {
                    this.removeActive();
                    this.cursor = this.cursor + 1;
                    if ( this.cursor > this.lastRow ) {
                        this.topRow += 1;
                        this.lastRow += 1;
                        this.list.nativeElement.scrollTop += (
                            36
                        );
                    }
                    this.list.nativeElement.children[ this.cursor ].classList.add( 'activeItem' );
                    return;
                }
            }
            if ( $event.keyCode === KeyEvent.ARROWUP ) {
                if ( this.cursor > 0 && this.cursor !== -1 ) {
                    this.removeActive();
                    this.cursor = this.cursor - 1;
                    if ( this.cursor < this.topRow ) {
                        this.topRow -= 1;
                        this.lastRow -= 1;
                        this.list.nativeElement.scrollTop -= (
                            36
                        );
                    }
                    this.list.nativeElement.children[ this.cursor ].classList.add( 'activeItem' );
                    return;
                }
            }
        }
        this.lastValue = this.modelValue;
    }

    searchItem( value, $event ) {
        this.showHide = true;
        value = value.trim();
        if ( !value || value === '' || value === 'undefined' || value === null ) {
            this.showHide = false;
            this.noDataFound = false;
            this.removeActive();
            return this.datasource = this.data;
        }
        const filtredData = [];
        this.data.forEach( ( value2, index ) => {
            this.query.forEach( ( value3 ) => {
                if ( value2[ String( value3 ) ].toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                    this.noDataFound = false;
                    // console.log( this.list.nativeElement.children[ index ].innerHTML.trim().split( '' ) );
                    filtredData.push( value2 );
                }
            } );
        } );
        this.datasource = this.removeDuplicateItems( filtredData );
        if(this.datasource.length <= 0 && this.modelValue){
            this.showHide = true;
            this.noDataFound = true;
        }
        if ( (this.lastValue !== value) && (this.datasource.length > 0) ) {
            setTimeout( () => {
                this.list.nativeElement.scrollTop = 0;
                this.topRow = 0;
                this.noDataFound = false;
                this.lastRow = this.itemAmount - 1;
                this.removeActive();
                this.setFirstActive();
                this.lastValue = value;
            }, 0 );

        }
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

    calcHeightItem() {
        if ( this.itemAmount >= this.datasource.length ) {
            return { 'height' : 'auto' };
        } else {
            return { 'height' : (36) * this.itemAmount + 'px' };
        }
    }

}
