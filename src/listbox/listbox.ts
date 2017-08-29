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
                    animate( '100ms ease-in', style( { opacity: 1 } ) )
                ] ),
                transition( ':leave', [
                    style( { opacity: 1 } ),
                    animate( '100ms ease-out', style( { opacity: 0 } ) )
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

    private filtering = false;

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
                        this.renderPageData( 0, this.rowsPage );
                    }
                }, 100 );
            } );
        }
        this.renderPageData( 0, this.rowsPage );
    }

    handleClickItem( item ) {
        this.onClickItem.emit( item );
    }

    handleSearch( searchValue ) {
        if ( searchValue.length >= this.charsToSearch ) {
            const filter = [];
            this.data.forEach( ( item, index, array ) => {
                this.searchQuery.forEach( ( query, index2, array2 ) => {
                    if ( item[ query ].toLowerCase().indexOf( searchValue.toLowerCase() ) !== -1 ) {
                        if ( filter.indexOf( item ) === -1 ) {
                            filter.push( item );
                        }
                    }
                } )
            } );

            this.filtredData = filter;
            this.filtering = true;
            this.filtredData.length === 0 ? this.renderPageData(0, this.datasource.length)
                : this.renderPageData( 0, this.filtredData.length );
            this.change.detectChanges();


            this.validateFiltredAsEmpty();
        } else {
            this.filtering = false;
            this.datasource = this.data;
            this.validateFiltredAsEmpty();
            this.renderPageData( 0, this.rowsPage );
        }
        this.handleScroll();
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

        if ( lastChildElem ) {

            const clientRect = lastChildElem.getBoundingClientRect();
            const parentClientRect = this.itemContainer.nativeElement.getBoundingClientRect();

            if ( clientRect ) {
                if ( clientRect.bottom < parentClientRect.bottom + (5 * this.rowHeight) ) {
                    const skip = this.lastRowViewport - this.quantityInVisibleRows - this.quantityVisibleRows;

                    let take = this.lastRowViewport + this.quantityInVisibleRows;

                    take = take > this.data.length ? this.data.length : take;

                    this.renderPageData( skip + 1, take );
                }
            } else {
                this.handleScrollFast();
            }

        }

    }

    handleScrollUp() {
        const firstElement = this.listBox.nativeElement.children[ 0 ];

        const parentClientRect = this.itemContainer.nativeElement.getBoundingClientRect();

        if ( firstElement ) {
            if ( ( firstElement.offsetTop <= this.scrollTop ) && (  this.listBox.nativeElement.children.length > 0 ) ) {
                const clientRect = firstElement.getBoundingClientRect();
                if ( clientRect.top > parentClientRect.top - (5 * this.rowHeight) ) {
                    let skip = this.listBox.nativeElement.children[ 0 ].getAttribute( 'data-indexnumber' ) - this.quantityInVisibleRows;
                    let take = skip + this.quantityVisibleRows + (this.quantityInVisibleRows * 2);
                    if ( skip < 0 ) {
                        skip = 0;
                        take = this.rowsPage;
                    }
                    this.renderPageData( skip, take );
                }
            } else {
                this.handleScrollFast();
            }
        }
    }

    renderPageData( skip, take ) {
        this.filtering ? this.datasource = this.filtredData.slice( skip, take )
            : this.datasource = this.data.slice( skip, take );
        this.renderList( skip );
    }


    renderList( skip ) {
        if ( this.datasource ) {
            if ( this.listBox.nativeElement.children.length > 0 ) {
                this.removeChilds();
            }
            for ( let row = 0; row < this.datasource.length; row++ ) {

                const liElement = new ElementRef( this.renderer.createElement( 'li' ) );

                this.renderer.setAttribute( liElement.nativeElement, 'data-indexnumber', String( (row + skip) ) );
                this.renderer.setStyle( liElement.nativeElement, 'top', (row + skip) * this.rowHeight + 'px' );
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

        let skip = currentStartIndex - this.quantityInVisibleRows;
        let take = currentStartIndex + this.quantityVisibleRows + this.quantityInVisibleRows;

        if ( skip < 0 ) {
            skip = 0;
            take = this.rowsPage;
        }

        this.renderPageData( skip, take );

    }

    onShowMoreMouseOut() {
        clearInterval( this.time );
    }

    onShowMoreMouseIn() {

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

