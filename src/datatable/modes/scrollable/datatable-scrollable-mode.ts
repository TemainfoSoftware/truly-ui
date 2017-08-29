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
    AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Inject, NgZone,
    Renderer2, ViewChild
} from '@angular/core';
import { TlDatatable } from '../../datatable';
import { KeyEvent } from '../../../core/enums/key-events';
import { TlDatatableDataSource } from '../../datatable-datasource.service';

let rowPosition = 0;

@Component( {
    selector : 'tl-datatable-scrollable-mode',
    templateUrl : './datatable-scrollable-mode.html',
    changeDetection : ChangeDetectionStrategy.OnPush,
    styleUrls : [ './datatable-scrollable-mode.scss', '../../datatable.scss' ],
} )
export class TlDatatableScrollableMode implements AfterContentInit {

    @ViewChild( 'listComponent' ) listComponent: ElementRef;

    @ViewChild( 'listBody' ) listBody: ElementRef;

    public datasourceChanges : EventEmitter<any> =  new EventEmitter();

    //*****//
    private bodyHeight: number;
    private quantityVisibleRows: number;
    private quantityInVisibleRows: number;
    private fixedHeightElemClientRect: number;
    private lastRowViewport = 0;

    private scrollTop = 0;
    private lastScrollTop = 0;

    private tabindex = 0;

    //*****//


    public loadingSource = false;

    private scrollPosition: number;

    private skip = 0;

    private take = 0;

    private scrollOfTop = 0;

    private clientHeight = 0;

    private scrollHeight = 0;

    private pageHeight = 0;

    private pageNumber = 1;

    private Counter = 1;

    private qtdRowClient = 0;

    private lastRow;


    constructor( @Inject( forwardRef( () => TlDatatable ) ) private datatable: TlDatatable,
                 public dataSourceService: TlDatatableDataSource,
                 private renderer: Renderer2, private zone: NgZone, private cd: ChangeDetectorRef ) {
    }


    ngAfterContentInit() {
        this.bodyHeight = this.datatable.rowHeight * this.datatable.totalRows;
        this.quantityVisibleRows = this.datatable.height / this.datatable.rowHeight;
        this.quantityInVisibleRows = Math.round( ( this.datatable.rowsPage - this.quantityVisibleRows ) / 2 );
        this.fixedHeightElemClientRect = this.listComponent.nativeElement.getBoundingClientRect();
        this.renderList( 0 );

        this.zone.runOutsideAngular( () => {
            this.listComponent.nativeElement.addEventListener( 'scroll', () => {
                this.handleScrollEvent();
                this.zone.run(()=>{
                    this.cd.detectChanges()
                })
            } );
        } );

    }


    handleScrollEvent() {
        this.setScrollTop();
        this.setCurrentRow();
        this.isScrollDown() ? this.handleScrollDown() : this.handleScrollUp();
        this.setLastScrollTop()
    }

    handleScrollDown() {

        let lastChildElem = this.listBody.nativeElement.rows[ this.listBody.nativeElement.rows.length - 1 ];

        if ( lastChildElem ) {

            let clientRect = lastChildElem.getBoundingClientRect();
            let parentClientRect = this.listComponent.nativeElement.getBoundingClientRect();


            if ( clientRect ) {
                if ( clientRect.bottom < parentClientRect.bottom + (5 * this.datatable.rowHeight) ) {
                    let skip = this.lastRowViewport - this.quantityInVisibleRows - this.quantityVisibleRows;
                    let take = this.lastRowViewport + this.quantityInVisibleRows;

                    take = take > this.datatable.totalRows ? this.datatable.totalRows : take;
                    console.log(skip,  take);
                    this.renderPageData( skip, take );
                }
            } else {
                this.handleScrollFast();
            }
        } else {
            this.handleScrollFast();
        }

    }

    handleScrollFast() {
        let currentStartIndex = Math.floor( this.scrollTop / this.datatable.rowHeight );

        let skip = currentStartIndex - this.quantityInVisibleRows;
        let take = currentStartIndex + this.quantityVisibleRows + this.quantityInVisibleRows;

        if ( skip < 0 ) {
            skip = 0;
            take = this.datatable.rowsPage;
        }

        this.renderPageData( skip, take );
    }

    handleScrollUp() {
        let firstElement = this.listBody.nativeElement.children[ 0 ];

        let parentClientRect = this.listComponent.nativeElement.getBoundingClientRect();

        if ( firstElement ) {
            if ( ( firstElement.offsetTop <= this.scrollTop ) && (  this.listBody.nativeElement.rows.length > 0 ) ) {
                let clientRect = firstElement.getBoundingClientRect();
                if ( clientRect.top > parentClientRect.top - (5 * this.datatable.rowHeight) ) {
                    let skip = this.listBody.nativeElement.children[ 0 ].getAttribute( 'row' ) - this.quantityInVisibleRows;
                    let take = skip + this.quantityVisibleRows + (this.quantityInVisibleRows * 2);
                    if ( skip < 0 ) {
                        skip = 0;
                        take = this.datatable.rowsPage;
                    }
                    this.renderPageData( skip, take );
                }
            } else {
                this.handleScrollFast();
            }
        } else {
            this.handleScrollFast();
        }
    }

    renderPageData( skip, take ) {
        this.dataSourceService.loadMoreData( skip, take ).then( ( loadindSource: boolean ) => {
            this.renderList( skip );
        } );
    }


    renderList( skip, take? ) {
        let rowCurrent = 0;
        if ( !this.dataSourceService.datasource ) {
            setTimeout( () => {
                if ( this.listBody.nativeElement.children.length > 0 ) {
                    this.removeChilds();
                }
                for ( let row = 0; row < this.dataSourceService.datasource.length; row++ ) {

                    let elementTR = new ElementRef( this.renderer.createElement( 'tr' ) );
                    this.renderer.setAttribute( elementTR.nativeElement, 'row', String( (row + skip) ) );
                    this.renderer.setStyle( elementTR.nativeElement, 'top', (row + skip) * this.datatable.rowHeight + 'px' );
                    this.renderer.setStyle( elementTR.nativeElement, 'position', 'absolute' );
                    this.renderer.setStyle( elementTR.nativeElement, 'height', this.datatable.rowHeight + 'px' );
                    this.renderer.addClass( elementTR.nativeElement, 'row' );
                    this.renderer.appendChild( this.listBody.nativeElement, elementTR.nativeElement );

                    for ( let collumn = 0; collumn < this.datatable.columns.length; collumn++ ) {
                        let elementTD = new ElementRef( this.renderer.createElement( 'td' ) );
                        this.renderer.addClass( elementTD.nativeElement, 'cel' );
                        this.renderer.addClass( elementTD.nativeElement, this.datatable.getClassAlignment( this.datatable.columns[ collumn ].alignment ) );
                        elementTD.nativeElement.innerHTML = this.dataSourceService.datasource[ row ][ this.datatable.columns[ collumn ].field ];
                        this.renderer.appendChild( this.listBody.nativeElement.children[ row ], elementTD.nativeElement );

                    }

                }
            } );
            return;
        }
        if ( this.listBody.nativeElement.children.length > 0 ) {
            this.removeChilds();
        }
        for ( let row = 0; row < this.dataSourceService.datasource.length; row++ ) {

            let elementTR = new ElementRef( this.renderer.createElement( 'tr' ) );
            this.renderer.setAttribute( elementTR.nativeElement, 'row', String( (row + skip) ) );
            this.renderer.setStyle( elementTR.nativeElement, 'top', (row + skip) * this.datatable.rowHeight + 'px' );
            this.renderer.setStyle( elementTR.nativeElement, 'position', 'absolute' );
            this.renderer.setStyle( elementTR.nativeElement, 'height', this.datatable.rowHeight + 'px' );
            this.renderer.addClass( elementTR.nativeElement, 'row' );
            this.renderer.appendChild( this.listBody.nativeElement, elementTR.nativeElement );

            for ( let collumn = 0; collumn < this.datatable.columns.length; collumn++ ) {
                let elementTD = new ElementRef( this.renderer.createElement( 'td' ) );
                this.renderer.addClass( elementTD.nativeElement, 'cel' );
                this.renderer.addClass( elementTD.nativeElement, this.datatable.getClassAlignment( this.datatable.columns[ collumn ].alignment ) );
                elementTD.nativeElement.innerHTML = this.dataSourceService.datasource[ row ][ this.datatable.columns[ collumn ].field ];
                this.renderer.appendChild( this.listBody.nativeElement.children[ row ], elementTD.nativeElement );
            }
        }

    }


    removeChilds() {
        this.listBody.nativeElement.innerHTML = '';
    }

    setCurrentRow() {
        this.lastRowViewport = Math.round( ( this.datatable.height + this.scrollTop  ) / this.datatable.rowHeight );
    }

    setScrollTop() {
        this.scrollTop = this.listComponent.nativeElement.scrollTop;
    }

    setLastScrollTop() {
        this.lastScrollTop = this.scrollTop;
    }

    isScrollDown() {
        return this.scrollTop > this.lastScrollTop;
    }


    //
    // onKeydown( $event ) {
    //     $event.preventDefault();
    //
    //     switch ( $event.keyCode ) {
    //         case KeyEvent.ARROWDOWN:
    //             this.handleKeyArrowDown($event);
    //             break;
    //         case KeyEvent.ARROWUP:
    //             this.handleKeyArrowUp();
    //             break;
    //         case KeyEvent.HOME:
    //             this.handleKeyHome();
    //             break;
    //         case KeyEvent.END:
    //             this.handleKeyEnd();
    //             break;
    //     }
    // }
    //
    // onKeyUp( $event ) {
    //     switch ( $event.keyCode ) {
    //         case KeyEvent.ARROWDOWN:
    //             // setTimeout( () => {
    //             //  this.scrollBoxElementRef.nativeElement.scrollTop =
    //             // ( (this.currentRow - (this.qtdRowClient - 1)) * this.datatable.rowHeight );
    //             // }, 1 );
    //             break;
    //     }
    // }
    //
    //
    // emitLazyLoad() {
    //     //  if ( this.isLazy() ) {
    //     // let at: any = document.activeElement;
    //     //
    //     //
    //     // this.Counter = Math.round(
    //     // (at.offsetTop + this.scrollOfTop - this.scrollBoxElementRef.nativeElement.scrollTop + this.datatable.rowHeight )
    //     // / this.datatable.rowHeight
    //     // );
    //
    //     if ( this.scrollPosition > this.scrollTop ) {
    //         if ( this.currentRow <= this.datatable.totalRows ) {
    //             if ( ( this.currentRow - this.qtdRowClient ) <= this.skip ) {
    //                 this.loadingSource = true;
    //                 this.skip = ( this.skip >= this.qtdRowClient ) && (  this.currentRow > this.qtdRowClient  )
    //                     ? this.currentRow - (this.qtdRowClient * 2)
    //                     : 0;
    //                 this.skip = this.skip < 0 ? 0 : this.skip;
    //
    //                 this.take = this.datatable.rowsPage;
    //                 this.scrollOfTop = (this.scrollTop - this.qtdRowClient * this.datatable.rowHeight) > 0
    //                                     ? this.scrollTop - this.qtdRowClient * this.datatable.rowHeight
    //                                     : 0;
    //
    //                 this.dataSourceService.loadMoreData( this.skip, this.take ).then(( loadingSource: boolean ) => {
    //                     setTimeout(() => {
    //                         this.loadingSource = loadingSource;
    //                     }, 100)
    //                 });
    //
    //             }
    //         }
    //     } else if ( this.scrollPosition < this.scrollTop ) {
    //         if ( this.currentRow <= this.datatable.totalRows ) {
    //             if ( ( this.take + this.skip ) <= this.currentRow ) {
    //                  this.loadingSource = true;
    //                  this.skip = this.currentRow - this.qtdRowClient;
    //                  this.take = this.datatable.rowsPage;
    //                  this.scrollOfTop = this.scrollTop;
    //
    //                  this.dataSourceService.loadMoreData( this.skip, this.take ).then(( loadingSource: boolean ) => {
    //                    setTimeout( () => {
    //                        this.loadingSource = loadingSource;
    //                    }, 100);
    //                  });
    //             }
    //         }
    //     }
    //     //  }
    // }
    //
    // emitEndRow() {
    //     if ( this.scrollTop >= (this.scrollHeight - (this.clientHeight)) ) {
    //         this.datatable.endRow.emit( { endRow : this.currentRow } )
    //     }
    // }
    //
    // emitChangePage() {
    //     if ( this.isLazy() ) {
    //         const pageNumber = Math.round( this.currentRow / this.datatable.rowsPage );
    //         if ( (this.scrollTop + this.clientHeight) >= (this.pageHeight * pageNumber) ) {
    //             if ( pageNumber !== this.pageNumber ) {
    //                 this.pageNumber = pageNumber;
    //                 this.datatable.pageChange.emit( { page : pageNumber } );
    //             }
    //         }
    //     }
    // }
    //
    // onRowClick( data, index ) {
    //     const at: any = document.activeElement;
    //     this.Counter = Math.round(
    //         (at.offsetTop + this.scrollOfTop - this.scrollBoxElementRef.nativeElement.scrollTop + this.datatable.rowHeight )
    //         / this.datatable.rowHeight
    //     );
    //     this.datatable.onRowClick( data, index );
    // }
    //
    //
    // handleKeyArrowDown(event) {
    //     if ( this.dataSourceService.loadingSource === true ) {
    //         console.log('Loading data...');
    //         return;
    //     }
    //     const at: any = document.activeElement;
    //     this.setCurrentRow();
    //     if ( this.isLastRow() ) {
    //         if ( at !== this.getChildrenOfTable()[ this.getChildrenOfTable().length - 1 ] ) {
    //             this.scrollBoxTableBodyElementRef.nativeElement.children[ at.tabIndex + 1 ].focus();
    //             this.datatable.tabindex = at.tabIndex + 1;
    //
    //             if ( this.Counter >= this.qtdRowClient ) {
    //
    //                 this.scrollBoxElementRef.nativeElement.scrollTop = (
    //                     (this.currentRow - (this.qtdRowClient - 1)) * this.datatable.rowHeight
    //                 );
    //
    //             } else {
    //                 this.Counter++
    //             }
    //         }
    //         return;
    //     }
    //
    //     this.scrollBoxTableBodyElementRef.nativeElement.children[ this.datatable.tabindex + 1 ].focus();
    //     this.datatable.tabindex = this.datatable.tabindex + 1;
    //
    //     if ( this.Counter >= this.qtdRowClient ) {
    //         this.scrollBoxElementRef.nativeElement.scrollTop = ( (this.currentRow - (this.qtdRowClient - 1)) * this.datatable.rowHeight );
    //     } else {
    //         this.Counter++
    //     }
    // }
    //
    // getChildrenOfTable() {
    //     return this.scrollBoxTableBodyElementRef.nativeElement.children;
    // }
    //
    //
    // handleKeyArrowUp() {
    //     if ( this.loadingSource === true ) {
    //         console.log('Loading data...');
    //         return;
    //     }
    //     const at: any = document.activeElement;
    //     this.setCurrentRow();
    //     if ( this.isFirstRow() ) {
    //
    //         if ( at !== this.getChildrenOfTable()[ 0 ] ) {
    //             this.scrollBoxTableBodyElementRef.nativeElement.children[ at.tabIndex - 1 ].focus();
    //             this.datatable.tabindex = at.tabIndex - 1;
    //
    //             if ( this.Counter > 1 ) {
    //                 this.Counter--
    //             } else {
    //                 this.scrollBoxElementRef.nativeElement.scrollTop = (
    //                     (this.currentRow - (this.qtdRowClient + 1)) * this.datatable.rowHeight
    //                 );
    //             }
    //         }
    //         return;
    //     }
    //
    //     this.scrollBoxTableBodyElementRef.nativeElement.children[ this.datatable.tabindex - 1 ].focus();
    //     this.datatable.tabindex = this.datatable.tabindex - 1;
    //
    //
    //     if ( this.Counter > 1 ) {
    //         this.Counter--
    //     } else {
    //         this.scrollBoxElementRef.nativeElement.scrollTop = ( (this.currentRow - (this.qtdRowClient + 1)) * this.datatable.rowHeight);
    //     }
    // }
    //
    // handleKeyHome() {
    //     this.scrollBoxElementRef.nativeElement.scrollTop = 0;
    //     setTimeout( () => {
    //         this.getChildrenOfTable()[ 0 ].focus();
    //
    //         this.Counter = 1
    //     }, 300 );
    // }
    //
    // handleKeyEnd() {
    //     this.scrollBoxElementRef.nativeElement.scrollTop = this.containerHeight;
    //     setTimeout( () => {
    //         this.getChildrenOfTable()[ this.getChildrenOfTable().length - 1 ].focus();
    //         const at: any = document.activeElement;
    //         this.Counter = Math.round(
    //             (at.offsetTop + this.scrollOfTop - this.scrollBoxElementRef.nativeElement.scrollTop + this.datatable.rowHeight )
    //             / this.datatable.rowHeight
    //         );
    //     }, 300 );
    // }
    //
    // refreshScrollPosition() {
    //     setTimeout( () => {
    //         this.scrollPosition = this.scrollTop;
    //     }, 10 )
    // }
    //
    // getScrollOfTop() {
    //     return 'translateY(' + this.scrollOfTop + 'px)';
    // }
    //


    //

    //
    // isLastRow() {
    //     return this.datatable.tabindex + 1 > this.scrollBoxTableBodyElementRef.nativeElement.children.length - 1;
    // }
    //
    // isFirstRow() {
    //     return this.datatable.tabindex === 0;
    // }
    //
    // isLazy() {
    //     return this.datatable.lazy;
    // }
}
