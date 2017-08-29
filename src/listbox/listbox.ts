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
    ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, NgZone
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { animate, style, transition, trigger } from '@angular/animations';

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

    @Input() filterEmptyMessage = 'Nothing to Show';

    @Input() id = '';

    @Output() onClickItem: EventEmitter<any> = new EventEmitter();

    @ViewChild( 'list' ) listBox;

    @ViewChild( 'itemContainer' ) itemContainer;

    @Input() searchQuery = [];

    private nothingToShow = false;

    private showMore = false;

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

    constructor( private renderer: Renderer2, private change: ChangeDetectorRef, private zone: NgZone ) {}

    ngOnInit() {
        this.datasource = this.data;
        this.handleSearchQuery();
        this.subject.debounceTime( 200 ).subscribe( searchTextValue => {
            this.handleSearch( searchTextValue );
        } );
    }

    ngAfterViewInit() {
        this.handleScroll();

        this.zone.runOutsideAngular( () => {
            this.itemContainer.nativeElement.addEventListener( 'scroll', () => {
                this.onScroll();
                this.zone.run( () => {
                    this.change.detectChanges()
                } )
            } )
        } );

        this.quantityVisibleRows = this.itemContainer.nativeElement.offsetHeight / this.rowHeight;
        this.quantityInVisibleRows = Math.round( ( this.rowsPage - this.quantityVisibleRows ) / 2 );

        if ( this.searchElement ) {
            this.renderer.listen( this.searchElement.input.nativeElement, 'keyup', ( $event ) => {
                this.subject.next( $event.target.value );
            } );
            this.renderer.listen( this.searchElement.input.nativeElement, 'change', ( $event ) => {
                setTimeout( () => {
                    if ( $event.target.value === '' ) {
                        this.filtering = false;
                       this.resetSkipAndTake();
                        this.renderPageData();
                    }
                }, 100 );
            } );
        }
        this.resetSkipAndTake();
        this.renderPageData();
    }

    resetSkipAndTake() {
        this.skip = 0;
        this.take = this.rowsPage;
    }

    handleClickItem( item ) {
        this.onClickItem.emit( item );
    }

    handleSearch( searchValue ) {
        this.itemContainer.nativeElement.scrollTop = 0;
        setTimeout( () => {
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
            this.handleScroll();
        }, 1 );
    }

    handleSkipAndTakeWhileSearching() {
        if (this.filtredData.length) {
            this.setSkipAndTakeAsDataSource();
            this.renderPageData()
        }else {
            this.setSkipAndTakeAsFiltredData();
            this.renderPageData()
        }
    }

    setSkipAndTakeAsDataSource() {
        this.skip = 0;
        this.take = this.datasource.length;
    }

    setSkipAndTakeAsFiltredData() {
        this.skip = 0;
        this.take = this.filtredData.length;
    }

    filterData(searchValue) {
        const filter = [];
        this.filtering = true;
        this.data.forEach( ( item ) => {
            this.searchQuery.forEach( ( query ) => {
                if ( item[ query ].toLowerCase().indexOf( searchValue.toLowerCase() ) !== -1 ) {
                    if ( filter.indexOf( item ) === -1 ) {
                        filter.push( item );
                    }
                }
            } )
        } );
        return filter;
    }

    handleScroll() {
        const itens = this.datasource.length;
        if ( itens > 10 ) {
            this.showMore = true;
            this.change.detectChanges();
        } else {
            this.showMore = false;
            this.change.detectChanges();
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

    handleSearchQuery() {
        if ( this.searchQuery.length === 0 ) {
            this.searchQuery.push( this.label, this.labelDetail );
        }
    }

    onScroll() {
        this.setScrollTop();
        this.setCurrentRow();
        this.isScrollDown() ? this.handleScrollDown() : this.handleScrollUp();
        this.setLastScrollTop();
        this.handleScrollDown();
    }

    handleScrollDown() {
        const lastChildElem = this.listBox.nativeElement.children[ this.listBox.nativeElement.children.length - 1 ];
        this.handleScrollFinish();
        if ( lastChildElem ) {
            const clientRect = lastChildElem.getBoundingClientRect();
            const parentClientRect = this.itemContainer.nativeElement.getBoundingClientRect();
            if ( clientRect ) {
                if ( clientRect.bottom < parentClientRect.bottom + (5 * this.rowHeight) ) {
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

    handleScrollFinish() {
        this.scrollFinish = (this.itemContainer.nativeElement.scrollTop +
        (this.quantityVisibleRows * this.rowHeight) >= this.listBox.nativeElement.offsetHeight);

        if (this.scrollFinish) {
            this.onShowMoreMouseOut();
        }
    }

    handleScrollUp() {
        const firstElement = this.listBox.nativeElement.children[ 0 ];
        const parentClientRect = this.itemContainer.nativeElement.getBoundingClientRect();
        if ( firstElement ) {
            if ( ( firstElement.offsetTop <= this.scrollTop ) && (  this.listBox.nativeElement.children.length > 0 ) ) {
                const clientRect = firstElement.getBoundingClientRect();
                if ( clientRect.top > parentClientRect.top - (5 * this.rowHeight) ) {
                    this.skip = this.listBox.nativeElement.children[ 0 ].getAttribute( 'data-indexnumber' ) - this.quantityInVisibleRows;
                    this.take = this.skip + this.quantityVisibleRows + (this.quantityInVisibleRows * 2);
                    this.validateSkipAndTakeRange();
                    this.renderPageData();
                }
            } else {
                this.handleScrollFast();
            }
        }
    }

    renderPageData() {
        this.filtering ? this.datasource = this.filtredData.slice( this.skip, this.take )
            : this.datasource = this.data.slice( this.skip, this.take );
        this.renderList();
    }

    renderList() {
        if ( this.datasource ) {
            if ( this.listBox.nativeElement.children.length > 0 ) {
                this.removeChilds();
            }
            for ( let row = 0; row < this.datasource.length; row++ ) {

                const liElement = new ElementRef( this.renderer.createElement( 'li' ) );

                this.renderer.setAttribute( liElement.nativeElement, 'data-indexnumber', String( (row + this.skip) ) );
                this.renderer.setStyle( liElement.nativeElement, 'top', (row + this.skip) * this.rowHeight + 'px' );
                this.renderer.setStyle( liElement.nativeElement, 'position', 'absolute' );
                this.renderer.setStyle( liElement.nativeElement, 'width', '100%' );
                this.renderer.setStyle( liElement.nativeElement, 'height', this.rowHeight + 'px' );
                this.renderer.addClass( liElement.nativeElement, 'item' );

                liElement.nativeElement.addEventListener('click', () => {
                    this.handleClickItem(this.datasource[row]);
                });

                this.renderer.appendChild( this.listBox.nativeElement, liElement.nativeElement );

                const spanID = new ElementRef( this.renderer.createElement( 'span' ) );
                this.renderer.setStyle( spanID.nativeElement, 'font-size', this.labelSize );
                this.renderer.setStyle( spanID.nativeElement, 'float', 'right' );
                spanID.nativeElement.innerHTML = this.datasource[ row ][ this.id ];

                const spanLabel = new ElementRef( this.renderer.createElement( 'span' ) );
                this.renderer.setStyle( spanLabel.nativeElement, 'font-size', this.labelSize );
                spanLabel.nativeElement.innerHTML = this.datasource[ row ][ this.label ];


                const spanDetail = new ElementRef( this.renderer.createElement( 'span' ) );
                this.renderer.setStyle( spanDetail.nativeElement, 'font-size', this.labelDetailSize );
                spanDetail.nativeElement.innerHTML = this.datasource[ row ][ this.labelDetail ];


                this.renderer.appendChild( liElement.nativeElement, spanID.nativeElement );
                this.renderer.appendChild( liElement.nativeElement, spanLabel.nativeElement );
                this.renderer.appendChild( liElement.nativeElement, spanDetail.nativeElement );

            }
            this.change.detectChanges();
        }

    }

    removeChilds() {
        this.listBox.nativeElement.innerHTML = '';
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

    isScrollDown() {
        return this.scrollTop > this.lastScrollTop;
    }

}

