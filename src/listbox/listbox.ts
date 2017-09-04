'use strict';
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
    Component, Input, AfterViewInit, OnInit, Output, EventEmitter, Renderer2,
    ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, NgZone,
    ContentChild, TemplateRef
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { animate, style, transition, trigger } from '@angular/animations';

import { ListBoxContainerDirective } from './lisbox-container-directive';
import { KeyEvent } from '../core/enums/key-events';


@Component( {
    selector: 'tl-listbox',
    templateUrl: './listbox.html',
    styleUrls: [ './listbox.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger(
            'onCreateElement', [
                transition( ':enter', [
                    style( { opacity: 0 } ),
                    animate( '200ms ease-in', style( { opacity: 1 } ) )
                ] ),
                transition( ':leave', [
                    style( { opacity: 1 } ),
                    animate( '200ms ease-out', style( { opacity: 0 } ) )
                ] )
            ]
        )
    ]
} )
export class TlListBox implements OnInit, AfterViewInit {

    @Input() data = [];

    @Input() label = '';

    @Input() labelSize = '1em';

    @Input() labelDetail = '';

    @Input() labelDetailSize = '0.7em';

    @Input() rowHeight = 50;

    @Input() searchElement;

    @Input() charsToSearch = 3;

    @Input() itensToShow = 10;

    @Input() filterEmptyMessage = 'Nothing to Show';

    @Input() id = '';

    @Output() onClickItem: EventEmitter<any> = new EventEmitter();

    @ViewChild( 'list' ) listBox;

    @ViewChild( 'itemContainer' ) itemContainer;

    @ViewChild( 'customTemplate' ) customTemplate;

    @ViewChild( ListBoxContainerDirective ) listTemplateContainer: ListBoxContainerDirective;

    @ContentChild( TemplateRef ) template: TemplateRef<Object>;

    @Input() searchQuery = [];

    private nothingToShow = false;

    private showMore = false;

    private cursor = -1;

    private subject: Subject<string> = new Subject();

    private filtredData = [];

    private time;

    private lastRowViewport = 0;

    private scrollTop = 0;

    private lastScrollTop = 0;

    private quantityInVisibleRows;

    private quantityVisibleRows;

    private rowsPage = 50;

    private datasource = [];

    private scrollFinish = false;

    private filtering = false;

    private skip;

    private take;

    private listElement;

    private spanElementId;

    private spanElementLabel;

    private spanElementLabelDetail;

    private lastRow;

    private firstRow;

    private cursorViewPortPosition = 0;

    private lastSelected;

    private lastScrollTopOnKey;

    constructor( public renderer: Renderer2, public change: ChangeDetectorRef, public zone: NgZone ) {}

    ngOnInit() {
        this.datasource = this.data;
        this.handleSearchQuery();
        this.subject.debounceTime( 200 ).subscribe( searchTextValue => {
            this.handleSearch( searchTextValue );
        } );
    }

    ngAfterViewInit() {
        this.quantityVisibleRows = this.itemContainer.nativeElement.offsetHeight / this.rowHeight;
        this.quantityInVisibleRows = Math.round( ( this.rowsPage - this.quantityVisibleRows ) / 2 );

        this.lastRow = this.quantityVisibleRows - 1;
        this.firstRow = 0;

        this.handleScrollShowMore();
        this.zone.runOutsideAngular( () => {
            this.itemContainer.nativeElement.addEventListener( 'scroll', () => {
                this.onScroll();
                this.zone.run( () => {
                    this.change.detectChanges()
                } )
            } )
        } );
        this.validateProperties();
        this.createListenerOnTemplate();
        this.existSearchElement();
        this.resetSkipAndTake();
        this.renderPageData();
        this.change.detectChanges();
    }

    createListenerOnTemplate() {
        if ( this.existCustomTemplate() ) {
            this.listBox.nativeElement.addEventListener( 'click', ( $event ) => {
                const indexDataGlobal = $event.target.dataset.indexnumber;
                let indexDataSet;

                for ( let element = 0; element < this.listBox.nativeElement.children.length; element++ ) {
                    if ( $event.target === this.listBox.nativeElement.children[ element ] ) {
                        indexDataSet = element;
                    }
                }

                this.handleClickItem( this.data[ indexDataGlobal ], indexDataSet );
            } );
        }
    }

    validateProperties() {
        if ( (!this.existCustomTemplate()) && (!this.label || !this.labelDetail || !this.id) ) {
            throw new EvalError( 'The properties [label] and [labelDetail] are required when the template is not defined' );
        }
        if ( !this.rowHeight ) {
            throw new EvalError( 'The properties [rowHeight] is required' );
        }
    }

    existSearchElement() {
        if ( this.searchElement ) {
            this.renderer.listen( this.searchElement.input.nativeElement, 'keydown', ( $event ) => {
                setTimeout( () => {
                    this.handleEventKeyDown( $event );
                }, 1 );
            } );
            this.renderer.listen( this.searchElement.input.nativeElement, 'change', ( $event ) => {
                setTimeout( () => {
                    this.itemContainer.nativeElement.scrollTop = 0;
                    if ( $event.target.value.length === 0 ) {
                        this.filtering = false;
                        this.resetSkipAndTake();
                        this.renderPageData();
                        this.validateFiltredAsEmpty();
                        this.handleScrollShowMore();
                    }
                }, 1 );
            } );
        }
    }

    handleClickItem( item, index ) {
        this.onClickItem.emit( item );
        this.cursor = index;
        this.focusOnSearchElement( index );
        this.getElementSelected();
        this.updateLastSelect();
        this.getCursorViewPortPosition( index );
    }

    getCursorViewPortPosition( index ) {
        const initRange = Math.floor( this.scrollTop / this.rowHeight );
        this.cursorViewPortPosition = this.listBox.nativeElement.children[ index ].getAttribute( 'data-indexnumber' ) - initRange;
        this.lastScrollTopOnKey = this.itemContainer.nativeElement.scrollTop;
    }


    getElementSelected() {
        for ( let element = 0; element < this.listBox.nativeElement.children.length; element++ ) {
            if ( this.listBox.nativeElement.children[ element ].getAttribute( 'class' ).includes( 'selected' ) ) {
                return this.renderer.removeClass( this.listBox.nativeElement.children[ element ], 'selected' );
            }
        }
    }

    focusOnSearchElement( index ) {
        !this.searchElement ? this.listBox.nativeElement.children[ index ].focus()
            : this.searchElement.input.nativeElement.focus();
    }

    handleEventKeyDown( $event ) {
        switch ( $event.keyCode ) {
            case KeyEvent.ARROWDOWN :
                this.handleKeyArrowDown();
                return;
            case KeyEvent.ARROWUP:
                $event.preventDefault();
                this.handleKeyArrowUp();
                return;
            case KeyEvent.ENTER:
                $event.preventDefault();
                break;
        }
        this.subject.next( $event.target.value );
    }


    handleKeyArrowDown() {
        if ( this.listBox.nativeElement.children ) {

            if ( this.cursor === -1 ) {
                return this.handleCursorInit();
            }

            if ( this.lastScrollTopOnKey !== this.itemContainer.nativeElement.scrollTop ) {
                this.itemContainer.nativeElement.scrollTop = this.lastScrollTopOnKey;
            }

            if ( this.cursor < this.listBox.nativeElement.children.length - 1 ) {
                if ( this.cursorViewPortPosition >= this.quantityVisibleRows - 1 ) {
                    this.itemContainer.nativeElement.scrollTop += this.rowHeight;
                    this.addSelectedClassOnNext();

                } else {
                    this.cursorViewPortPosition++;
                    this.addSelectedClassOnNext();
                }

                this.cursor++;
                this.lastSelected = this.listBox.nativeElement.children[ this.cursor ].getAttribute( 'data-indexnumber' );
                this.lastScrollTopOnKey = this.itemContainer.nativeElement.scrollTop;
            }
        }

    }

    handleKeyArrowUp() {
        if ( this.listBox.nativeElement.children ) {

            if ( this.lastScrollTopOnKey !== this.itemContainer.nativeElement.scrollTop ) {
                this.itemContainer.nativeElement.scrollTop = this.lastScrollTopOnKey;
            }

            if ( this.cursor > 0 ) {
                if ( this.cursorViewPortPosition <= 0 ) {
                    this.itemContainer.nativeElement.scrollTop -= this.rowHeight;
                    this.addSelectedClassOnPrevious();
                } else {
                    this.cursorViewPortPosition--;
                    this.addSelectedClassOnPrevious();
                }

                this.cursor--;
                this.lastSelected = this.listBox.nativeElement.children[ this.cursor ].getAttribute( 'data-indexnumber' );

                this.lastScrollTopOnKey = this.itemContainer.nativeElement.scrollTop;
            }

        }
    }

    addSelectedClassOnNext() {
        this.renderer.removeClass( this.listBox.nativeElement.children[ this.cursor ], 'selected' );
        this.renderer.addClass( this.listBox.nativeElement.children[ this.cursor + 1 ], 'selected' );
    }

    addSelectedClassOnPrevious() {
        this.renderer.removeClass( this.listBox.nativeElement.children[ this.cursor ], 'selected' );
        this.renderer.addClass( this.listBox.nativeElement.children[ this.cursor - 1 ], 'selected' );
    }


    handleCursorInit() {
        this.cursor++;
        this.renderer.addClass( this.listBox.nativeElement.children[ this.cursor ], 'selected' );
    }

    handleSearch( searchValue ) {
        this.itemContainer.nativeElement.scrollTop = 0;
            if ( searchValue.length >= this.charsToSearch ) {
                this.filtredData = this.filterData(searchValue);
                this.handleSkipAndTakeWhileSearching();
                this.validateFiltredAsEmpty();

            } else {
                this.filtering = false;
                this.datasource = this.data;
                this.validateFiltredAsEmpty();
                this.resetSkipAndTake();
                this.renderPageData();
            }
        this.handleScrollShowMore();
    }

    handleSkipAndTakeWhileSearching() {
        if (this.filtredData.length) {
            this.setSkipAndTakeAsFiltredData();
            this.renderPageData();
        }else {
            this.setSkipAndTakeAsDataSource();
            this.renderPageData();
        }
    }

    handleScrollShowMore() {
        const itens = this.datasource.length;
        if ( itens > 10 ) {
            this.showMore = true;
            this.change.detectChanges();
        } else {
            this.showMore = false;
            this.change.detectChanges();
        }
    }

    handleSearchQuery() {
        if ( this.searchQuery.length === 0 ) {
            Object.keys( this.data[ 0 ] ).forEach( ( value ) => {
                this.searchQuery.push( value );
            } );
        }
    }

    handleScrollDown() {
        this.handleScrollFinish();
        if ( this.lastChildElement() ) {
            if ( this.lastChildElement() ) {
                if ( this.lastChildElement().bottom < this.parentElement().bottom + (5 * this.rowHeight) ) {
                    this.skip = this.lastRowViewport - this.quantityInVisibleRows - this.quantityVisibleRows;
                    this.take = this.lastRowViewport + this.quantityInVisibleRows;
                    this.take = this.take > this.data.length ? this.data.length : this.take;
                    this.renderPageData();
                }
            } else {
                this.handleScrollFast();
            }
        }
    }

    handleScrollUp() {
        if ( this.firstChildElement() ) {
            if ( ( this.firstChildElement().offsetTop <= this.scrollTop ) && (  this.listBox.nativeElement.children.length > 0 ) ) {
                if ( this.firstChildElement().getBoundingClientRect().top > this.parentElement().top - (5 * this.rowHeight) ) {
                    this.skip = this.firstChildElement().getAttribute( 'data-indexnumber' ) - this.quantityInVisibleRows;
                    this.take = this.skip + this.quantityVisibleRows + (this.quantityInVisibleRows * 2);
                    this.validateSkipAndTakeRange();
                    this.renderPageData();
                }
            } else {
                this.handleScrollFast();
            }
        }
    }


    firstChildElement() {
        return this.listBox.nativeElement.children[ 0 ];
    }


    lastChildElement() {
        const lastChildElem = this.listBox.nativeElement.children[ this.listBox.nativeElement.children.length - 1 ];
        return lastChildElem.getBoundingClientRect();
    }

    parentElement() {
        return this.itemContainer.nativeElement.getBoundingClientRect();
    }

    handleScrollFinish() {
        this.scrollFinish = (this.itemContainer.nativeElement.scrollTop +
        (this.quantityVisibleRows * this.rowHeight) >= this.listBox.nativeElement.offsetHeight);

        if ( this.scrollFinish ) {
            this.onShowMoreMouseOut();
        }
    }


    filterData(searchValue) {
        const filter = [];
        this.filtering = true;
        this.data.forEach( ( item ) => {
            this.searchQuery.forEach( ( query ) => {
                if ( item[ query ].toString().toLowerCase().trim().includes( searchValue.toLowerCase().trim() ) ) {
                    if ( filter.indexOf( item ) === -1 ) {
                        filter.push( item );
                    }
                }
            } )
        } );
        return filter;
    }

    renderPageData() {
        this.filtering ? this.datasource = this.filtredData.slice( this.skip, this.take )
            : this.datasource = this.data.slice( this.skip, this.take );

        this.existCustomTemplate() ? this.renderCustomList() : this.renderList();
    }

    existCustomTemplate() {
        for (const node of this.customTemplate.nativeElement.childNodes) {
            if (node.nodeName === '#comment') {
                return true;
            }
        }
        return false;
    }

    renderList() {
        requestAnimationFrame( () => {
            if ( this.datasource ) {
                this.zone.runOutsideAngular( () => {
                    if ( this.listBox.nativeElement.children.length > 0 ) {
                        this.removeChilds();
                    }
                    for ( let row = 0; row < this.datasource.length; row++ ) {
                        this.createElementList( row );
                        this.addEventClickToListElement( row );
                        this.appendListElementToListBox();
                        this.createElementSpanId( row );
                        this.createElementSpanLabel( row );
                        this.createElementSpanLabelDetail( row );
                        this.renderer.appendChild( this.listElement.nativeElement, this.spanElementId.nativeElement );
                        this.renderer.appendChild( this.listElement.nativeElement, this.spanElementLabel.nativeElement );
                        this.renderer.appendChild( this.listElement.nativeElement, this.spanElementLabelDetail.nativeElement );
                    }
                } );

                if ( this.cursor > -1 ) {
                    this.getElementOfList();
                }
            }
        } );
    }


    getElementOfList() {
        for ( let element = 0; element < this.listBox.nativeElement.children.length; element++ ) {
            if ( this.listBox.nativeElement.children[ element ].getAttribute( 'data-indexnumber' ) === this.lastSelected ) {
                this.cursor = element;
                return this.updateLastSelect();
            }
        }
    }

    updateLastSelect() {
        if ( this.listBox.nativeElement.children[ this.cursor ] ) {
            if (!this.searchElement) {
                this.listBox.nativeElement.children[ this.cursor ].focus();
            }
            this.renderer.addClass( this.listBox.nativeElement.children[ this.cursor ], 'selected' );
        }
    }

    createElementList(row) {
        this.listElement = new ElementRef( this.renderer.createElement( 'li' ) );
        this.renderer.setAttribute( this.listElement.nativeElement, 'data-indexnumber', String( (row + this.skip) ) );
        this.renderer.setAttribute( this.listElement.nativeElement, 'tabindex', '-1' );
        this.renderer.setStyle( this.listElement.nativeElement, 'top', (row + this.skip) * this.rowHeight + 'px' );
        this.renderer.setStyle( this.listElement.nativeElement, 'position', 'absolute' );
        this.renderer.setStyle( this.listElement.nativeElement, 'width', '100%' );

        this.renderer.setStyle( this.listElement.nativeElement, 'height', this.rowHeight + 'px' );
        this.renderer.addClass( this.listElement.nativeElement, 'item' );
    }

    addEventClickToListElement(row) {
        this.listElement.nativeElement.addEventListener( 'click', () => {
            this.handleClickItem( this.datasource[ row ], row );
        } );
        this.listElement.nativeElement.addEventListener( 'keydown', ( $event: KeyboardEvent ) => {
            $event.preventDefault();
            $event.stopPropagation();
            this.handleEventKeyDown( $event );
        } );
    }

    appendListElementToListBox() {
        this.renderer.appendChild( this.listBox.nativeElement, this.listElement.nativeElement );
    }

    createElementSpanId(row) {
        this.spanElementId = new ElementRef( this.renderer.createElement( 'span' ) );
        this.renderer.setStyle( this.spanElementId.nativeElement, 'font-size', this.labelSize );
        this.renderer.setStyle( this.spanElementId.nativeElement, 'float', 'right' );
        this.spanElementId.nativeElement.append( this.datasource[ row ][ this.id ] );
    }

    createElementSpanLabel(row) {
        this.spanElementLabel = new ElementRef( this.renderer.createElement( 'span' ) );
        this.renderer.setStyle( this.spanElementLabel.nativeElement, 'font-size', this.labelSize );
        this.spanElementLabel.nativeElement.append( this.datasource[ row ][ this.label ] );

    }

    createElementSpanLabelDetail(row) {
        this.spanElementLabelDetail = new ElementRef( this.renderer.createElement( 'span' ) );
        this.renderer.setStyle( this.spanElementLabelDetail.nativeElement, 'font-size', this.labelDetailSize );
        this.spanElementLabelDetail.nativeElement.append( this.datasource[ row ][ this.labelDetail ] );
    }

    createCustomTemplate(item, index) {
        return this.template.createEmbeddedView( {
            item: item,
            index: index
        } );
    }

    renderCustomList() {
        if ( this.datasource ) {
            this.zone.runOutsideAngular( () => {
                if ( this.listBox.nativeElement.children.length > 0 ) {
                    this.removeChilds();
                }
                for ( let row = 0; row < this.datasource.length; row++ ) {
                    const nodes = this.createCustomTemplate( this.datasource[ row ], row );
                    this.listTemplateContainer.viewList.insert( nodes );

                    for ( const element of nodes.rootNodes ) {
                        if ( element.nodeName === 'LI' ) {
                            this.renderer.appendChild( this.listBox.nativeElement, element );
                            this.renderer.setAttribute( element, 'data-indexnumber', String( (row + this.skip) ) );
                            this.renderer.setStyle( element, 'top', (row + this.skip) * this.rowHeight + 'px' );
                            this.renderer.setStyle( element, 'position', 'absolute' );
                            this.renderer.setStyle( element, 'width', '100%' );
                            this.renderer.setStyle( element, 'height', this.rowHeight + 'px' );
                        }
                    }
                }
            } );
            this.getElementOfList();
        }
    }

    handleScrollFast() {
        const currentStartIndex = Math.floor( this.scrollTop / this.rowHeight );
        this.skip = currentStartIndex - this.quantityInVisibleRows;
        this.take = currentStartIndex + this.quantityVisibleRows + this.quantityInVisibleRows;
        this.validateSkipAndTakeRange();
        this.renderPageData();
    }

    validateSkipAndTakeRange() {
        if ( this.skip < 0 ) {
            this.skip = 0;
            this.take = this.rowsPage;
        }
    }

    validateFiltredAsEmpty() {
        if ( this.datasource.length === 0 ) {
            this.nothingToShow = true;
            this.change.detectChanges();
        } else {
            this.nothingToShow = false;
            this.change.detectChanges();
        }
    }

    onScroll() {
        this.setScrollTop();
        this.setCurrentRow();
        this.isScrollDown() ? this.handleScrollDown() : this.handleScrollUp();
        this.setLastScrollTop();
        this.handleScrollDown();
    }

    onShowMoreMouseOut() {
        clearTimeout( this.time );
    }

    onShowMoreMouseIn( direction ) {
        this.time = setTimeout( () => {
            direction === 'down' ?  this.scrollToDown(direction) : this.scrollToUp(direction);
        }, 100 );
    }

    scrollToUp(direction) {
        if ( this.scrollTop > 0 ) {
            this.itemContainer.nativeElement.scrollTop = this.itemContainer.nativeElement.scrollTop - this.rowHeight;
            this.onShowMoreMouseIn( direction );
        }
    }

    scrollToDown(direction) {
        if ( this.scrollTop < this.listBox.nativeElement.offsetHeight ) {
            this.itemContainer.nativeElement.scrollTop = this.itemContainer.nativeElement.scrollTop + this.rowHeight;
            this.onShowMoreMouseIn( direction );
        }
    }

    setCurrentRow() {
        this.lastRowViewport = Math.round( ( this.itemContainer.nativeElement.offsetHeight + this.scrollTop  ) / this.rowHeight );
    }

    setScrollTop() {
        this.scrollTop = this.itemContainer.nativeElement.scrollTop;
    }

    setLastScrollTop() {
        this.lastScrollTop = this.scrollTop;
    }

    setSkipAndTakeAsDataSource() {
        this.skip = 0;
        this.take = this.datasource.length;
    }

    setSkipAndTakeAsFiltredData() {
        this.skip = 0;
        this.take = this.filtredData.length;
    }

    isScrollDown() {
        return this.scrollTop > this.lastScrollTop;
    }

    removeChilds() {
        while ( this.listBox.nativeElement.hasChildNodes() ) {
            this.listBox.nativeElement.removeChild( this.listBox.nativeElement.lastChild );
        }
    }

    resetSkipAndTake() {
        this.skip = 0;
        this.take = this.rowsPage;
    }

}

