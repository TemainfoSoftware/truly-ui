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
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef,
    EventEmitter, forwardRef, Input, NgZone, OnInit, Output, Renderer2, ViewChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { ComponentHasModelBase } from '../core/base/component-has-model.base';

import { NameGeneratorService } from '../core/helper/namegenerator.service';
import { IdGeneratorService } from '../core/helper/idgenerator.service';
import { TabIndexService } from '../form/tabIndex.service';
import { KeyEvent } from '../core/enums/key-events';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

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

export class TlAutoComplete extends ComponentHasModelBase implements AfterViewInit, OnInit {

    @Input() data: Array<any>;

    @Input() itemHeight: number;

    @Input() itemsToScroll: number;

    @Input() dataID: string;

    @Input() dataLabel: string;

    @Input() query: any[] = [];

    @Input() clearButton: boolean;

    @Input() minCharToSearch: number;

    @ViewChild( 'list' ) list;

    @ViewChild( 'filter' ) filter;

    @ViewChild( 'customTemplate' ) customTemplate;

    @Output() clear: EventEmitter<any> = new EventEmitter();

    public zIndex = 0;

    private showList: boolean;

    private dataType: string;

    private dataSource: any[] = [];

    private filterString: Subject<string> = new Subject();

    private lastItemPosition;

    private firstItemPosition;

    private listElement;

    private spanElementDataID;

    private spanElementDataLabel;

    private filtredData = [];

    private cursor;

    private nothingToShow: boolean;

    constructor( public renderer: Renderer2,
                 tabIndexService: TabIndexService,
                 public idService: IdGeneratorService,
                 public nameService: NameGeneratorService,
                 private change: ChangeDetectorRef,
                 public zone: NgZone ) {
        super( tabIndexService, idService, nameService );
        this.itemHeight = 36;
        this.itemsToScroll = 5;
        this.showList = false;
        this.clearButton = false;
        this.dataType = 'object';
        this.dataID = '';
        this.dataLabel = '';
        this.cursor = -1;
        this.nothingToShow = false;
        this.minCharToSearch = 1;
    }

    ngOnInit() {
        this.filterString.debounceTime( 250 )
            .subscribe( searchTextValue => {
                this.handleSearch( searchTextValue );
            } );
    }

    ngAfterViewInit() {
        this.setElement( this.filter, 'autocomplete' );
        this.updateDataSource( this.getData() );
        this.validateDefaultProperties();
        this.lastItemPosition = this.itemsToScroll - 1;
        this.firstItemPosition = 0;
        this.renderDataList();
        this.change.detectChanges();
    }

    renderDataList() {
        if ( !this.existCustomTemplate() ) {
            if ( this.nothingToShow ) {
                if ( this.list.nativeElement.children.length > 0 ) {
                    while ( this.list.nativeElement.hasChildNodes() ) {
                        this.list.nativeElement.removeChild( this.list.nativeElement.lastChild );
                    }
                }
                this.createElementNothingToShow();
                this.renderer.appendChild( this.list.nativeElement, this.listElement.nativeElement );
                this.createElementIconNothingToShow();
                this.renderer.appendChild( this.listElement.nativeElement, this.spanElementDataID.nativeElement );
                this.createElementLabelNothingToShow();
                this.renderer.appendChild( this.listElement.nativeElement, this.spanElementDataLabel.nativeElement );

                return;
            }
            if ( this.dataSource ) {
                this.zone.runOutsideAngular( () => {
                    if ( this.list.nativeElement.children.length > 0 ) {
                        while ( this.list.nativeElement.hasChildNodes() ) {
                            this.list.nativeElement.removeChild( this.list.nativeElement.lastChild );
                        }
                    }
                    for ( let item = 0; item < this.dataSource.length; item++ ) {
                        this.createElementLi( item );
                        this.renderer.appendChild( this.list.nativeElement, this.listElement.nativeElement );
                        if ( this.dataType === 'object' ) {
                            this.createElementSpanDataID( item );
                            this.renderer.appendChild( this.listElement.nativeElement, this.spanElementDataID.nativeElement );
                        }
                        this.createElementSpanLabel( item );
                        this.renderer.appendChild( this.listElement.nativeElement, this.spanElementDataLabel.nativeElement );
                    }
                } );
            }
        }
    }

    createElementLabelNothingToShow() {
        this.spanElementDataLabel = new ElementRef( this.renderer.createElement( 'span' ) );
        this.spanElementDataLabel.nativeElement.append( ' No Data Found' );
    }

    createElementLi( item ) {
        this.listElement = new ElementRef( this.renderer.createElement( 'li' ) );
        this.renderer.setAttribute( this.listElement.nativeElement, 'data-indexnumber', String( item ) );
        this.renderer.setAttribute( this.listElement.nativeElement, 'tabindex', '-1' );
        this.renderer.setStyle( this.listElement.nativeElement, 'height', this.itemHeight + 'px' );
        // this.renderer.addClass( this.listElement.nativeElement, 'item' );
    }

    createElementNothingToShow() {
        this.listElement = new ElementRef( this.renderer.createElement( 'li' ) );
        this.renderer.setAttribute( this.listElement.nativeElement, 'data-indexnumber', '0' );
        this.renderer.setAttribute( this.listElement.nativeElement, 'tabindex', '-1' );
        this.renderer.setStyle( this.listElement.nativeElement, 'height', this.itemHeight + 'px' );
        this.renderer.addClass( this.listElement.nativeElement, 'no-data-found' );
    }

    createElementIconNothingToShow() {
        this.spanElementDataID = new ElementRef( this.renderer.createElement( 'i' ) );
        this.renderer.addClass( this.spanElementDataID.nativeElement, 'ion-sad-outline' );
    }

    createElementSpanDataID( item ) {
        this.spanElementDataID = new ElementRef( this.renderer.createElement( 'span' ) );
        this.renderer.setStyle( this.spanElementDataID.nativeElement, 'float', 'right' );
        this.spanElementDataID.nativeElement.append( this.dataSource[ item ][ this.dataID ] );
    }

    createElementSpanLabel( item ) {
        this.spanElementDataLabel = new ElementRef( this.renderer.createElement( 'span' ) );
        this.spanElementDataLabel.nativeElement.append( this.dataSource[ item ][ this.dataLabel ] );
    }

    existCustomTemplate() {
        for ( const node of this.customTemplate.nativeElement.childNodes ) {
            if ( node.nodeName === '#comment' ) {
                return true;
            }
        }
        return false;
    }

    validateDefaultProperties() {
        if ( typeof this.itemsToScroll !== 'number' ) {
            throw new EvalError( 'You must pass some valid number to the [itemsToScroll] property of the tl-autocomplete element.' +
                ' Ex.: [itemsToScroll]="4"' );
        }
        if ( typeof this.itemHeight !== 'number' ) {
            throw new EvalError( 'You must pass some valid number to the [itemHeight] property of the tl-autocomplete element.' +
                ' Ex.: [itemHeight]="4"' );
        }
    }

    updateDataSource( data ) {
        data.forEach( ( value ) => {
            this.dataSource.push( value );
        } );
    }

    getData() {
        this.dataType = typeof this.data[ 0 ];
        if ( ( this.dataType === undefined ) ) {
            throw new EvalError( 'You must pass some valid data to the [data] property of the tl-autocomplete element.' );
        }
        if ( this.dataType === 'string' ) {
            return this.constructSimpleData();
        }
        if ( (typeof this.data[ 0 ] === 'object') && ( (this.dataID.length <= 0)
            || (this.dataLabel.length <= 0) || (this.query.length <= 0) ) ) {
            throw new EvalError( 'You must use the [dataID], [dataLabel] and [query] properties' +
                ' when using the [data] property of the tl-autocomplete element.' );
        }
        if ( typeof this.data[ 0 ] === 'object' && ( (this.dataID.length <= 0)
            || (this.dataLabel.length <= 0) || (this.query[ 0 ].length <= 0) ) ) {
            throw new EvalError( 'You must pass some valid value to the [dataID], [dataLabel] and [query] properties' +
                ' when using the [data] property of the tl-autocomplete element.' );
        }
        this.checkDataProperties();
        return this.data;
    }

    constructSimpleData() {
        if ( this.query.length > 0 || this.dataLabel.length > 0 || this.dataID.length > 0 ) {
            throw new EvalError( 'You should not use the [dataID], [dataLabel] and [query] properties' +
                ' when using the SIMPLEDATA of the tl-autocomplete element.' );
        }
        const simpleData = [];
        this.data.forEach( ( value ) => {
            simpleData.push( { 'value' : value } );
        } );
        this.dataID = 'value';
        this.dataLabel = 'value';
        this.query = [ 'value' ];
        return simpleData;
    }

    checkDataProperties() {
        this.isQuery();
        this.isDataID();
        this.isDataLabel();
    }

    isDataID() {
        let numberOfError = 0;
        Object.keys( this.data[ 0 ] ).forEach( ( dataKey ) => {
            if ( dataKey !== this.dataID ) {
                numberOfError = numberOfError + 1;
            }
        } );
        if ( numberOfError === Object.keys( this.data[ 0 ] ).length ) {
            throw new EvalError( 'You must pass a valid value to a [dataID] property that exists in the [data] property.' );
        }
    }

    isDataLabel() {
        let numberOfError = 0;
        Object.keys( this.data[ 0 ] ).forEach( ( dataKey ) => {
            if ( dataKey !== this.dataLabel ) {
                numberOfError = numberOfError + 1;
            }
        } );
        if ( numberOfError === Object.keys( this.data[ 0 ] ).length ) {
            throw new EvalError( 'You must pass a valid value to a [dataLabel] property that exists in the [data] property.' );
        }
    }

    isQuery() {
        this.query.forEach( ( queryValue ) => {
            let numberOfError = 0;
            Object.keys( this.data[ 0 ] ).forEach( ( dataKey ) => {
                if ( dataKey !== queryValue ) {
                    numberOfError = numberOfError + 1;
                }
            } );
            if ( numberOfError === Object.keys( this.data[ 0 ] ).length ) {
                throw new EvalError( 'You must pass a valid value to a [query] property that exists in the [data] property.' );
            }
        } );
    }

    handleFilter( $event ) {
        const filterValue = $event.target.value;
        this.filterString.next( filterValue );
    }

    handleList( $event ) {
    }

    handleSearch( searchValue ) {
        this.getAndSetZIndex();
        if ( searchValue.length >= this.minCharToSearch ) {
            this.showList = true;
            this.list.nativeElement.scrollTop = 0;
            this.dataSource = this.filterData( searchValue );
        }
        this.validateFiltredAsEmpty();
        this.renderDataList();
        this.cursor = -1;

    }

    validateFiltredAsEmpty() {
        if ( this.dataSource.length === 0 ) {
            this.nothingToShow = true;
            this.change.detectChanges();
        } else {
            this.nothingToShow = false;
            this.change.detectChanges();
        }
    }

    filterData( searchValue ) {
        const filter = [];
        this.data.forEach( ( item ) => {
            if ( this.dataType === 'object' ) {
                this.query.forEach( ( query ) => {
                    if ( item[ query ].toString().toLowerCase().trim().includes( searchValue.toLowerCase().trim() ) ) {
                        if ( filter.indexOf( item ) === -1 ) {
                            filter.push( item );
                        }
                    }
                } );
            } else {
                if ( item.toLowerCase().indexOf( searchValue.toLowerCase() ) !== -1 ) {
                    filter.push( { value : item } );
                }
            }
        } );
        return filter;
    }

    getAndSetZIndex() {
        this.zIndex = globalZindex++;
        return this.zIndex;
    }

    clearFilter() {
        this.writeValue( '' );
        this.filter.nativeElement.focus();
        this.clear.emit();
    }

    calcListHeight() {
        if ( this.itemsToScroll >= this.dataSource.length ) {
            return { 'height' : 'auto' };
        } else {
            return { 'height' : (this.itemHeight * this.itemsToScroll) + 'px' };
        }
    }

    closeList() {
        this.showList = false;
    }


}
