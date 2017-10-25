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
    Component, Input, AfterViewInit, OnInit, Output, EventEmitter, Renderer2, ViewChild, ChangeDetectionStrategy,
    ChangeDetectorRef, DoCheck,
    ElementRef, NgZone, ContentChild, TemplateRef, EmbeddedViewRef, IterableDiffers
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { ListBoxContainerDirective } from './lisbox-container-directive';
import { KeyEvent } from '../core/enums/key-events';


@Component( {
    selector: 'tl-listbox',
    templateUrl: './listbox.html',
    styleUrls: [ './listbox.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger(
            'enterAnimation', [
                state( 'true', style( { opacity : 1, transform : 'translate(0%,0%)' } ) ),
                state( 'false', style( { opacity : 0, transform : 'translate(0%,-3%)', flex : '0' } ) ),
                transition( '1 => 0', animate( '100ms' ) ),
                transition( '0 => 1', animate( '100ms' ) ),
            ]
        )
    ]
} )
export class TlListBox implements OnInit, AfterViewInit, DoCheck {

    @Input() id = '';

    @Input() data = [];

    @Input() label = '';

    @Input() labelSize = '1em';

    @Input() labelDetail = '';

    @Input() labelDetailSize = '0.7em';

    @Input() rowHeight = 50;

    @Input() searchElement;

    @Input() charsToSearch = 3;

    @Input() addMore = false;

    @Input() itensToShow = 10;

    @Input() searchQuery = [];

    @Input() hiddenScroll = false;

    @Input() filterEmptyMessage = 'Nothing to Show';

    @Input() rowsPage = 50;

    @Input() showArrows = true;

    @Input() fixedHeight = true;

    @Input() addMoreMessage = 'Add More';

    @Input() listStripped = false;

    @Input() openFocus = false;

    @Input() customInput = false;

    @Output() onClickItem: EventEmitter<any> = new EventEmitter();

    @Output() onClickAddMore: EventEmitter<any> = new EventEmitter();

    @ViewChild( 'list' ) listBox;

    @ViewChild( 'itemContainer' ) itemContainer;

    @ViewChild( 'customTemplate' ) customTemplate;

    @ViewChild( ListBoxContainerDirective ) listTemplateContainer: ListBoxContainerDirective;

    @ContentChild( TemplateRef ) template: TemplateRef<Object>;

    public  showList = true;

    private nothingToShow = false;

    private showMore = false;

    private cursor = -1;

    private subject = new Subject();

    private filtredData = [];

    private timeArrow;

    private timeScroll;

    private lastRowViewport = 0;

    private scrollTop = 0;

    private lastScrollTop = 0;

    private quantityInVisibleRows;

    private quantityVisibleRows;

    private datasource = [];

    private scrollFinish = false;

    private filtering = false;

    private skip;

    private take;

    private listElement;

    private addMoreElement;

    private spanAddMoreLabel;

    private spanAddMoreIcon;

    private spanElementId;

    private spanElementLabel;

    private spanElementLabelDetail;

    private lastRow;

    private firstRow;

    private cursorViewPortPosition = -1;

    private lastSelected;

    private lastScrollTopOnKey;

    private scrollListener;

    private scrollByArrows;

    private isScrolling;

    private itemSelected;

    private iterableDiffer;

    constructor( public renderer: Renderer2, public change: ChangeDetectorRef, public zone: NgZone,
                 private _iterableDiffers: IterableDiffers ) {
        this.iterableDiffer = this._iterableDiffers.find([]).create(null);
    }

    ngOnInit() {
        this.datasource = this.data;
        this.handleSearchQuery();
        this.subject.debounceTime( 100 ).subscribe( searchTextValue => {
            this.handleSearch( searchTextValue );
        } );
    }

    ngAfterViewInit() {
        this.quantityVisibleRows = this.itemContainer.nativeElement.offsetHeight / this.rowHeight;
        this.quantityInVisibleRows = Math.round( ( this.rowsPage - this.quantityVisibleRows ) / 2 );

        this.lastRow = this.quantityVisibleRows - 1;
        this.firstRow = 0;
        this.handleScrollShowMore();
        this.addScrollListListener();
        this.validateProperties();
        this.addListenerOnTemplate();
        this.addListenersSearchElement();
        this.resetSkipAndTake();
        this.renderPageData();
        this.change.detectChanges();
    }

    addScrollListListener() {
        this.zone.runOutsideAngular( () => {
            this.scrollListener = this.renderer.listen( this.itemContainer.nativeElement, 'scroll', () => {
                clearTimeout( this.timeScroll );
                this.onScroll();
                this.detectChanges();
                this.timeScroll = setTimeout( () => {
                    if ( !this.scrollByArrows ) {
                        this.isScrolling === 'DOWN' ? this.setFocusOnLast() : this.setFocusOnFirst();
                    }
                }, 66 )
            } );
        } );
    }

    addEventClickToListElement(row) {
        this.zone.run( () => {
            this.renderer.listen( this.listElement.nativeElement, 'click', ( $event ) => {
                $event.stopPropagation();
                this.handleClickItem( this.datasource[ row ], row );
                this.handleOpenFocusList();
            } );
        } );
    }

    addEventKeyDownToListElement( row ) {
        if ( !this.existCustomTemplate() ) {
            this.listElement.nativeElement.addEventListener( 'keydown', ( $event: KeyboardEvent ) => {
                this.scrollByArrows = true;
                $event.preventDefault();
                $event.stopPropagation();
                this.handleEventKeyDown( $event, row );
            } );
        } else {
            this.addCustomTemplateKeyDownListener(row);
        }
    }

    addCustomTemplateKeyDownListener(customListElement) {
        customListElement.addEventListener( 'keydown', ( $event: KeyboardEvent ) => {
            this.scrollByArrows = true;
            $event.preventDefault();
            $event.stopPropagation();
            this.handleEventKeyDown( $event );
        } );
    }

    addListenerOnTemplate() {
        if ( this.existCustomTemplate() ) {
            this.addClickEventToCustomTemplate();
        }
    }

    addClickEventToCustomTemplate() {
        this.listBox.nativeElement.addEventListener( 'click', ( $event ) => {
            const array = !this.filtering ? this.data : this.datasource;
            this.handleClickItem(  array[ this.getElementListOfCustomTemplate( $event ).indexDataGlobal ],
                this.getIndexOnList( this.getElementListOfCustomTemplate( $event ).listElement ) );
        } );
    }

    addListenersSearchElement() {
        if ( this.searchElement ) {
            this.listenerKeyDownSearchElement();
            this.listenerFocusSearchElement();
        }
    }

    listenerKeyDownSearchElement() {
        this.renderer.listen( this.searchElement.input.nativeElement, 'keydown', ( $event ) => {
            setTimeout( () => {
                if ( $event.target.value.length === 0 ) {
                    if ((this.skip !== 0) || (this.take !== this.rowsPage)) {
                        this.filtering = false;
                        this.resetSkipAndTake();
                        this.renderPageData();
                        this.validateFiltredAsEmpty();
                        this.handleScrollShowMore();
                        return;
                    }
                }else {
                    this.handleEventKeyDown( $event );
                }
            }, 1 );

        } );
    }

    listenerFocusSearchElement() {
        this.renderer.listen( this.searchElement.input.nativeElement, 'focus', ( $event ) => {
            if ( this.openFocus ) {
                this.showList = true;
                this.detectChanges();
            }
        } );
    }

    public detectChanges() {
        this.zone.run( () => {
            this.change.detectChanges()
        } );
    }

    snapScreenScroll() {
        const calcLines = (this.getScrollPositionByContainer() * this.rowHeight);
        if ( (this.itemContainer.nativeElement.scrollTop % calcLines) ) {
            this.itemContainer.nativeElement.scrollTop = calcLines;
        }
    }


    focusElement( index ) {
        // this.listBox.nativeElement.children[ index ].focus();
    }

    getElementListOfCustomTemplate( $event ) {
        const item = { indexDataGlobal: '', listElement: '' };
        for ( let pathElement = 0; pathElement < $event.path.length; pathElement++ ) {
            if ( $event.path[ pathElement ].localName === 'li' ) {
                item.indexDataGlobal = $event.path[ pathElement ].dataset.indexnumber;
                item.listElement = $event.path[ pathElement ];
                return item;
            }
        }
    }

    getIndexOnList( listElement ) {
        for ( let element = 0; element < this.listBox.nativeElement.children.length; element++ ) {
            if ( listElement === this.listBox.nativeElement.children[ element ] ) {
                return element;
            }
        }
    }

    getScrollPositionByContainer() {
        return Math.floor( this.scrollTop / this.rowHeight );
    }

    getCursorViewPortPosition( index ) {
        this.cursorViewPortPosition =
            this.listBox.nativeElement.children[ index ].getAttribute( 'data-indexnumber' ) -
            this.getScrollPositionByContainer();
        this.lastScrollTopOnKey = this.itemContainer.nativeElement.scrollTop;
    }

    handleClickItem( item, index ) {
        this.onClickItem.emit( item );
        this.itemSelected = item;
        this.cursor = index;
        this.focusElement( index );
        this.updateLastSelect();
        this.getCursorViewPortPosition( index );
    }

    handleEventKeyDown( $event, row? ) {
        switch ( $event.keyCode ) {
            case KeyEvent.ARROWDOWN :
                $event.preventDefault();
                $event.stopPropagation();
                this.handleKeyArrowDown();
                return;
            case KeyEvent.ARROWUP:
                $event.preventDefault();
                $event.stopPropagation();
                this.handleKeyArrowUp();
                return;
            case KeyEvent.ENTER:
                $event.preventDefault();
                this.handleKeyEnter();
                return;
        }
        this.subject.next( $event.target.value );
    }


    handleKeyEnter() {
        if (!this.existCustomTemplate()) {
            this.handleFiltredListNotSelected();
            this.handleOpenFocusList();
            return;
        }
    }

    handleOpenFocusList() {
        if (this.openFocus) {
            this.searchElement.input.nativeElement.focus();
            this.showList = false;
            this.detectChanges();
        }
    }

    handleFiltredListNotSelected() {
        if (this.showList && this.filtredData.length > 0 && !this.itemSelected) {
            this.handleClickItem(this.datasource[0], 0);
        }
    }

    handleKeyArrowDown() {
        this.handleShowList();
        if ( this.existChildElements() ) {
            this.handleLastScrollTopOnKey();
            if ( this.cursor < this.listBox.nativeElement.children.length - 1 ) {
                if ( this.cursorViewPortPosition >= this.quantityVisibleRows - 1 ) {
                    this.itemContainer.nativeElement.scrollTop += this.rowHeight;
                    this.setFocusOnNextCursor();
                } else {
                    this.cursorViewPortPosition++;
                    this.setFocusOnNextCursor();
                }
                if ( !this.searchElement ) {
                    this.cursor++;
                }
                this.setLastSelected();
                this.setLastScrollTopOnKey();
            }
        }
    }

    handleKeyArrowUp() {
        if ( this.existChildElements() ) {
            this.handleLastScrollTopOnKey();
            if ( this.cursor > 0 ) {
                if ( this.cursorViewPortPosition <= 0 ) {
                    this.itemContainer.nativeElement.scrollTop -= this.rowHeight;
                    this.setFocusOnPreviousCursor();
                } else {
                    this.cursorViewPortPosition--;
                    this.setFocusOnPreviousCursor();
                }
                if ( !this.searchElement ) {
                    this.cursor--;
                }
                this.setLastSelected();
                this.setLastScrollTopOnKey();
            }
            this.handleFocusOnSearchElement();
        }
    }

    handleLastScrollTopOnKey() {
        if ( !this.isLastScrollTopOnKeyEqualsScroll() ) {
            this.itemContainer.nativeElement.scrollTop = this.lastScrollTopOnKey;
        }
    }

    handleShowList() {
        if (!this.showList) {
            this.showList = true;
            this.detectChanges();
        }
    }

    handleSearch( searchValue ) {
        this.itemContainer.nativeElement.scrollTop = 0;
        if (searchValue) {
            if ( searchValue.length < this.charsToSearch ) {
                this.filtering = false;
                this.datasource = this.data;
                this.validateFiltredAsEmpty();
                this.resetSkipAndTake();
                this.renderPageData();
            } else {
                this.itemSelected = null;
                this.filtredData = this.filterData( searchValue );
                this.handleSkipAndTakeWhileSearching();
                this.validateFiltredAsEmpty();
            }
            this.cursor = -1;
            this.handleScrollShowMore();
        }
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
        if ( !this.isDataSourceGreaterThanRowsPage() ) {
            return;
        }
        if ( this.filtering ) {
            return;
        }
        if ( this.lastChildElement().getBoundingClientRect() ) {
            if ( ( this.lastChildElement().offsetTop >= this.scrollTop ) && (  this.listBox.nativeElement.children.length > 0 ) ) {
                if ( this.lastChildElement().getBoundingClientRect().bottom < this.parentElement().bottom + (5 * this.rowHeight) ) {
                    this.skip = this.lastRowViewport - this.quantityInVisibleRows - this.quantityVisibleRows;
                    this.take = this.lastRowViewport + this.quantityInVisibleRows;
                    this.take = this.take > this.data.length ? this.data.length : this.take;
                    this.renderPageData();
                }
            } else {
                this.handleScrollFast( 'DOWN' );
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
                this.handleScrollFast( 'UP' );
            }
        }
    }

    handleScrollFinish() {
        this.scrollFinish = (this.itemContainer.nativeElement.scrollTop +
        (this.quantityVisibleRows * this.rowHeight) >= this.listBox.nativeElement.offsetHeight);

        if ( this.scrollFinish ) {
            this.onShowMoreMouseOut();
        }
    }

    handleScrollFast( direction ) {
        this.isScrolling = direction;
        const currentStartIndex = this.getScrollPositionByContainer();
        this.skip = currentStartIndex - this.quantityInVisibleRows;
        this.take = currentStartIndex + this.quantityVisibleRows + this.quantityInVisibleRows;
        this.scrollByArrows = false;
        this.validateSkipAndTakeRange();
        this.renderPageData();
        this.snapScreenScroll();
    }


    firstChildElement() {
        return this.listBox.nativeElement.children[ 0 ];
    }

    lastChildElement() {
        return this.listBox.nativeElement.children[ this.listBox.nativeElement.children.length - 1 ];
    }

    parentElement() {
        return this.itemContainer.nativeElement.getBoundingClientRect();
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

    renderList() {
        if ( this.datasource ) {
            requestAnimationFrame( () => {
                this.zone.runOutsideAngular( () => {
                    if ( this.listBox.nativeElement.children.length > 0 ) {
                        this.removeChilds();
                    }
                    for ( let row = 0; row < this.datasource.length; row++ ) {
                        this.createElementList( row );
                        this.addEventClickToListElement( row );
                        this.addEventKeyDownToListElement( row );
                        this.appendListElementToListBox();
                        this.createElementSpanId( row );
                        this.createElementSpanLabel( row );
                        this.renderer.appendChild( this.listElement.nativeElement, this.spanElementLabel.nativeElement );
                        if ( this.id ) {
                            this.renderer.appendChild( this.listElement.nativeElement, this.spanElementId.nativeElement )
                        }
                    }
                    this.createAddMore();
                } );
                if ( this.cursor > -1 ) {
                    this.getElementOfList();
                }
            } );
        }
    }


    createAddMore() {
        if ( !this.addMore ) {
            return;
        }
        this.createElementAddMore();
        this.createSpanAddMore();
        this.createSpanIconAddMore();
        this.renderer.appendChild( this.listBox.nativeElement, this.addMoreElement.nativeElement );
        this.createListenerKeyDownAddMore();
        this.createListenerClickAddMore();
    }

    createListenerKeyDownAddMore() {
        this.zone.run( () => {
            this.addMoreElement.nativeElement.addEventListener( 'keydown', ( $event: KeyboardEvent ) => {
                this.scrollByArrows = true;
                $event.preventDefault();
                $event.stopPropagation();
                if ( $event.keyCode === KeyEvent.ENTER ) {
                    this.handleClickAddMore();
                }
                this.handleEventKeyDown( $event );
            } );
        } );
    }

    createListenerClickAddMore() {
        this.zone.run( () => {
            this.addMoreElement.nativeElement.addEventListener( 'click', ( $event: MouseEvent ) => {
                $event.preventDefault();
                $event.stopPropagation();
                this.handleClickAddMore();
            } );
        } );
    }

    createSpanIconAddMore() {
        this.spanAddMoreIcon = new ElementRef( this.renderer.createElement( 'i' ) );
        this.renderer.addClass( this.spanAddMoreIcon.nativeElement, 'ion-ios-plus-outline' );
        this.renderer.appendChild( this.spanAddMoreLabel.nativeElement, this.spanAddMoreIcon.nativeElement );
    }

    createSpanAddMore() {
        this.spanAddMoreLabel = new ElementRef( this.renderer.createElement( 'span' ) );
        this.renderer.setStyle( this.spanAddMoreLabel.nativeElement, 'font-size', this.labelSize );
        this.spanAddMoreLabel.nativeElement.append( this.addMoreMessage );
        this.renderer.appendChild( this.addMoreElement.nativeElement, this.spanAddMoreLabel.nativeElement );
    }

    createElementAddMore() {
        this.addMoreElement = new ElementRef( this.renderer.createElement( 'li' ) );
        this.renderer.setAttribute( this.addMoreElement.nativeElement, 'data-indexnumber',
            String( ((this.datasource.length + 1) + this.skip) ) );
        this.renderer.setAttribute( this.addMoreElement.nativeElement, 'tabindex', '-1' );
        this.renderer.setStyle( this.addMoreElement.nativeElement, 'top',
            ((this.datasource.length) + this.skip) * this.rowHeight + 'px' );
        this.renderer.setStyle( this.addMoreElement.nativeElement, 'line-height', (this.rowHeight - 10) + 'px' );
        this.renderer.setStyle( this.addMoreElement.nativeElement, 'height', this.rowHeight + 'px' );
        this.renderer.addClass( this.addMoreElement.nativeElement, 'item' );
        this.renderer.addClass( this.addMoreElement.nativeElement, 'addMore' );
    }

    handleClickAddMore() {
        this.onClickAddMore.emit();
        this.showList = false;
        this.change.detectChanges();
    }

    getListBoxHeight() {
        if (!this.fixedHeight) {
            if ( (this.filtredData.length < this.itensToShow) && this.filtering ) {
                let height = this.filtredData.length * this.rowHeight;
                return this.addMore ? height += this.rowHeight + 1 : height += 1;
            }
        }
        return this.itensToShow * this.rowHeight;
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
            this.listBox.nativeElement.children[ this.cursor ].focus();
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
        if (this.listStripped) {
            this.renderer.addClass( this.listElement.nativeElement, 'stripped' );
        }
    }

    appendListElementToListBox() {
        this.renderer.appendChild( this.listBox.nativeElement, this.listElement.nativeElement );
    }

    createElementSpanId(row) {
        if ( this.id ) {
            const padding = 10;
            this.spanElementId = new ElementRef( this.renderer.createElement( 'div' ) );
            this.renderer.setStyle( this.spanElementId.nativeElement, 'font-size', this.labelSize );
            this.renderer.setStyle( this.spanElementId.nativeElement, 'height', (this.rowHeight - padding) + 'px' );
            this.renderer.setStyle( this.spanElementId.nativeElement, 'float', 'right' );
            this.renderer.setStyle( this.spanElementId.nativeElement, 'line-height', (this.rowHeight - padding) + 'px' );
            this.spanElementId.nativeElement.append( this.datasource[ row ][ this.id ] );
        }
    }

    createElementSpanLabel(row) {
        this.spanElementLabel = new ElementRef( this.renderer.createElement( 'div' ) );
        this.renderer.setStyle( this.spanElementLabel.nativeElement, 'font-size', this.labelSize );
        this.renderer.setStyle( this.spanElementLabel.nativeElement, 'position', 'absolute' );

        const spanLabel = new ElementRef( this.renderer.createElement( 'span' ) );
        spanLabel.nativeElement.append( this.datasource[ row ][ this.label ] );
        this.renderer.appendChild( this.spanElementLabel.nativeElement, spanLabel.nativeElement );

        this.createElementSpanLabelDetail( row );
    }

    createElementSpanLabelDetail( row ) {
        if ( this.labelDetail ) {
            const spanLabelDetail = new ElementRef( this.renderer.createElement( 'span' ) );
            this.renderer.setStyle( spanLabelDetail.nativeElement, 'font-size', '0.8em' );
            spanLabelDetail.nativeElement.append( this.datasource[ row ][ this.labelDetail ] );
            this.renderer.appendChild( this.spanElementLabel.nativeElement, spanLabelDetail.nativeElement );
        }
    }

    createCustomTemplate(item, index): EmbeddedViewRef<any> {
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
                            this.renderer.setAttribute( element, 'tabindex', '-1' );
                            this.renderer.setStyle( element, 'top', (row + this.skip) * this.rowHeight + 'px' );
                            this.renderer.setStyle( element, 'position', 'absolute' );
                            this.renderer.setStyle( element, 'width', '100%' );
                            this.renderer.setStyle( element, 'height', this.rowHeight + 'px' );
                            this.addEventKeyDownToListElement( element );
                        }
                    }
                }
                this.createAddMore();
            } );
            this.getElementOfList();
        }
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

    validateProperties() {
        if ( (!this.existCustomTemplate()) && (!this.label) ) {
            throw new EvalError( 'The properties [label] and [labelDetail] are required when the template is not defined' );
        }
        if ( !this.rowHeight ) {
            throw new EvalError( 'The properties [rowHeight] is required' );
        }
    }

    onScroll() {
        this.setScrollTop();
        this.setCurrentRow();
        this.isScrollDown() ? this.handleScrollDown() : this.handleScrollUp();
        this.setLastScrollTop();
    }

    onShowMoreMouseOut() {
        clearTimeout( this.timeArrow );
    }

    onShowMoreMouseIn( direction ) {
        this.timeArrow = setTimeout( () => {
            direction === 'down' ?  this.setScrollToDown(direction) : this.setScrollToUp(direction);
        }, 100 );
    }

    setFocusOnLast() {
        const end = this.getScrollPositionByContainer() + this.quantityVisibleRows - 1;
        const element = document.querySelector( 'li[data-indexnumber="' + end + '"]' );
        this.scrollListener();
        // (element as HTMLElement).focus();
        this.addScrollListListener();
        this.setNewItemPosition();
    }

    setFocusOnFirst() {
        const element = document.querySelector( 'li[data-indexnumber="' + this.getScrollPositionByContainer() + '"]' );
        this.scrollListener();
        // (element as HTMLElement).focus();
        this.addScrollListListener();
        this.setNewItemPosition();
    }


    setNewItemPosition() {
        for ( let element = 0; element < this.listBox.nativeElement.children.length; element++ ) {
            if ( this.listBox.nativeElement.children[ element ] === document.activeElement ) {
                this.cursor = element;
                this.getCursorViewPortPosition( element );
                this.snapScreenScroll();
                return;
            }
        }
    }

    setScrollToUp(direction) {
        if ( this.scrollTop > 0 ) {
            this.itemContainer.nativeElement.scrollTop = this.itemContainer.nativeElement.scrollTop - this.rowHeight;
            this.onShowMoreMouseIn( direction );
        }
    }

    setScrollToDown(direction) {
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

    setFocusOnNextCursor() {
        const index = this.cursor + 1;
        this.listBox.nativeElement.children[ index ].focus();
        this.handleSelectItemWhileNavigating(index);
    }

    setFocusOnPreviousCursor() {
        const index = this.cursor - 1;
        this.listBox.nativeElement.children[ index ].focus();
        this.handleSelectItemWhileNavigating(index);
    }

    handleFocusOnSearchElement() {
        if ( !this.searchElement ) {
            return;
        }
        if ( document.activeElement === this.listBox.nativeElement.children[ 0 ] ) {
            this.searchElement.input.nativeElement.focus();
            this.resetCursors();
            return;
        }
    }

    handleSelectItemWhileNavigating(index) {
        if (this.searchElement) {
            this.handleClickItem( this.datasource[ index ], index );
        }
    }

    setLastScrollTopOnKey() {
        this.lastScrollTopOnKey = this.itemContainer.nativeElement.scrollTop;
    }

    setLastSelected() {
        this.lastSelected = this.listBox.nativeElement.children[ this.cursor ].getAttribute( 'data-indexnumber' );
    }

    isScrollDown() {
        return this.scrollTop > this.lastScrollTop;
    }

    isLastScrollTopOnKeyEqualsScroll() {
        return this.lastScrollTopOnKey === this.itemContainer.nativeElement.scrollTop;
    }

    isDataSourceGreaterThanRowsPage() {
        return this.data.length > this.rowsPage;
    }

    existChildElements() {
        return this.listBox.nativeElement.children;
    }

    existCustomTemplate() {
        if ( this.customInput ) {
            return true;
        }
        for (const node of this.customTemplate.nativeElement.childNodes) {
            if (node.nodeName === '#comment') {
                return true;
            }
        }
        return false;
    }

    resetSkipAndTake() {
        this.skip = 0;
        this.take = this.rowsPage;
    }

    public resetCursors() {
        this.itemContainer.nativeElement.scrollTop = 0;
        this.cursor = -1;
        this.cursorViewPortPosition = -1;
    }

    removeChilds() {
        while ( this.listBox.nativeElement.hasChildNodes() ) {
            this.listBox.nativeElement.removeChild( this.listBox.nativeElement.lastChild );
        }
    }

    ngDoCheck() {
        const changes = this.iterableDiffer.diff(this.data);
        if (changes) {
            this.renderPageData();
            this.change.detectChanges();
        }
    }

}

