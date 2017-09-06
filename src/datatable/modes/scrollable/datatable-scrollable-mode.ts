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
    AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Inject, NgZone, Renderer2, ViewChild
} from '@angular/core';
import { TlDatatable } from '../../datatable';
import { KeyEvent } from '../../../core/enums/key-events';
import { TlDatatableDataSource } from '../../datatable-datasource.service';

@Component( {
    selector : 'tl-datatable-scrollable-mode',
    templateUrl : './datatable-scrollable-mode.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls : [ './datatable-scrollable-mode.scss', '../../datatable.scss' ],
} )
export class TlDatatableScrollableMode implements AfterContentInit {

    @ViewChild( 'listComponent' ) listComponent: ElementRef;

    @ViewChild( 'listBody' ) listBody: ElementRef;

    private bodyHeight = 0;

    private quantityVisibleRows = 0;

    private quantityInVisibleRows = 0;

    private lastRowViewport = 0;

    private firstRowViewport = 0;

    private scrollTop = 0;

    private lastScrollTop = 0;

    private skip = 0;

    private scrollLockAt = 0;

    private lastRecord: any;

    private mouseClicked = false;

    private activeElement: Element;

    constructor( @Inject( forwardRef( () => TlDatatable ) ) private datatable: TlDatatable,
                 public dataSourceService: TlDatatableDataSource,
                 private renderer: Renderer2,
                 private cd: ChangeDetectorRef
    ) {}

    ngAfterContentInit() {
        this.setProprertiesFromTale();
        this.addListenerToDataSource();
        this.addListenerToScroll();
        this.firstRender();
    }


    private setProprertiesFromTale(){
        this.bodyHeight = this.datatable.rowHeight * this.datatable.totalRows;
        this.quantityVisibleRows = this.datatable.height / this.datatable.rowHeight;
        this.quantityInVisibleRows = Math.round( ( this.datatable.rowsPage - this.quantityVisibleRows ) / 2 );
        this.setlastRowViewport();
    }

    private addListenerToDataSource(){
        this.dataSourceService.onChangeDataSourceEmitter.subscribe((dataSource) => {

            if ( this.lastRecord !== dataSource[0]) {
                this.renderList(this.skip, dataSource);
                this.datatable.loading = false;
                this.cd.detectChanges();
                this.setFocusForNextElement();
            }
        });
    }

    private addListenerToScroll(){
        this.listComponent.nativeElement.addEventListener('scroll', () => {
            this.setScrollTop();
            this.setlastRowViewport();
            this.isScrollDown() ? this.handleScrollDown() : this.handleScrollUp();
            this.setLastScrollTop()
        });

    }

    private firstRender(){
        setTimeout(() => {
            this.renderList( 0, this.dataSourceService.datasource );
            this.activeElement = this.listBody.nativeElement.rows[0];
            this.cd.detectChanges();
        }, 1)
    }

    private handleScrollDown() {
            const lastChildElem = this.listBody.nativeElement.rows[ this.listBody.nativeElement.rows.length - 1 ];
            if ( lastChildElem ) {
                const clientRect = lastChildElem.getBoundingClientRect();
                const parentClientRect = this.listComponent.nativeElement.getBoundingClientRect();
                if ( clientRect ) {
                    if ( clientRect.bottom < parentClientRect.bottom + (5 * this.datatable.rowHeight) ) {
                        const skip = this.lastRowViewport - this.quantityInVisibleRows - this.quantityVisibleRows;
                        let take = this.lastRowViewport + this.quantityInVisibleRows;
                        take = take > this.datatable.totalRows ? this.datatable.totalRows : take;
                        this.scrollLockAt = this.scrollTop;
                        this.renderPageData( skip, take );
                    }
                } else {
                    this.handleScrollFast();
                }
            } else {
                this.handleScrollFast();
            }
    }

    private handleScrollFast() {
        const currentStartIndex = Math.floor( this.scrollTop / this.datatable.rowHeight );
        let skip = currentStartIndex - this.quantityInVisibleRows;
        let take = currentStartIndex + this.quantityVisibleRows + this.quantityInVisibleRows;
        if ( skip < 0 ) {
            skip = 0;
            take = this.datatable.rowsPage;
        }
        this.renderPageData( skip, take );
    }

    private handleScrollUp() {
        const firstElement = this.listBody.nativeElement.children[ 0 ];
        const parentClientRect = this.listComponent.nativeElement.getBoundingClientRect();

        if ( firstElement ) {

            if ( ( firstElement.offsetTop <= this.scrollTop ) && (  this.listBody.nativeElement.rows.length > 0 ) ) {
                const clientRect = firstElement.getBoundingClientRect();
                if ( clientRect.top > parentClientRect.top - (5 * this.datatable.rowHeight) ) {
                    let skip = this.listBody.nativeElement.children[ 0 ].getAttribute( 'row' ) - this.quantityInVisibleRows;
                    let take = skip + this.quantityVisibleRows + (this.quantityInVisibleRows * 2);
                    if ( skip < 0 ) {
                        skip = 0;
                        take = this.datatable.rowsPage;
                    }
                    this.scrollLockAt = this.scrollTop;
                    this.renderPageData( skip, take );
                }
            } else {
                this.handleScrollFast();
            }

        }else {
            this.handleScrollFast()
        }


    }

    private renderPageData( skip, take ) {
        this.datatable.loading = true;
        this.skip = skip;
        this.dataSourceService.loadMoreData(skip, take);
        this.cd.markForCheck();
    }


    private renderList( lastRow, dataSource ) {

        this.removeChilds();
        this.lastRecord = dataSource[0];
        for ( let row = 0; row < dataSource.length; row++ ) {

            const elementTR = new ElementRef( this.renderer.createElement( 'tr' ) );
            this.renderer.setAttribute( elementTR.nativeElement, 'row', String( (row + lastRow) ) );
            this.renderer.setAttribute( elementTR.nativeElement, 'tabindex', String( (row + lastRow) ) );
            this.renderer.setStyle( elementTR.nativeElement, 'top', (row + lastRow) * this.datatable.rowHeight + 'px' );
            this.renderer.setStyle( elementTR.nativeElement, 'position', 'absolute' );
            this.renderer.setStyle( elementTR.nativeElement, 'height', this.datatable.rowHeight + 'px' );
            this.renderer.addClass( elementTR.nativeElement, 'row' );
            this.renderer.appendChild( this.listBody.nativeElement, elementTR.nativeElement );

            for ( let collumn = 0; collumn < this.datatable.columns.length; collumn++ ) {
                const elementTD = new ElementRef( this.renderer.createElement( 'td' ) );
                this.renderer.addClass( elementTD.nativeElement, 'cel' );
                this.renderer.setStyle( elementTD.nativeElement, 'height', this.datatable.rowHeight + 'px' );
                elementTD.nativeElement.innerHTML = dataSource[ row ][ this.datatable.columns[ collumn ].field ];
                this.renderer.appendChild( this.listBody.nativeElement.children[ row ], elementTD.nativeElement );
            }
        }

    }

    private removeChilds() {
        if ( this.listBody.nativeElement.children.length > 0 ) {
            this.listBody.nativeElement.innerHTML = '';
        }
    }

    private setlastRowViewport() {
        this.lastRowViewport = Math.round( ( this.datatable.height + this.scrollTop  ) / this.datatable.rowHeight );
        this.firstRowViewport = this.lastRowViewport - this.quantityVisibleRows+1;
        console.log(this.lastRowViewport,this.firstRowViewport);
    }

    private setScrollTop() {
        if (this.datatable.loading && (!this.mouseClicked)) {
            this.listComponent.nativeElement.scrollTop = this.scrollLockAt;
            return
        }
        this.scrollTop = this.listComponent.nativeElement.scrollTop;
    }

    private setLastScrollTop() {
        this.lastScrollTop = this.scrollTop;
    }

    private isScrollDown() {
        console.log('ScrollTOP',this.scrollTop ,this.lastScrollTop);
        return this.scrollTop > this.lastScrollTop;
    }

    private mouseDown() {
        this.mouseClicked = true;
    }

    private mouseUp() {
        this.mouseClicked = false;
    }


    onClick(event){
        this.activeElement = event.target.parentElement;
        const initRange = Math.floor( this.scrollTop / this.datatable.rowHeight );

    }

    private onKeydown( $event ) {
        $event.preventDefault();

        switch ( $event.keyCode ) {
            case KeyEvent.ARROWDOWN:
                this.handleKeyArrowDown();
                break;
            case KeyEvent.ARROWUP:
                this.handleKeyArrowUp();
                break;
            // case KeyEvent.HOME:
            //     this.handleKeyHome();
            //     break;
            // case KeyEvent.END:
            //     this.handleKeyEnd();
            //     break;
        }
    }

    private handleKeyArrowDown(){
        if(this.activeElement.nextElementSibling){
            (this.activeElement.nextElementSibling as HTMLElement).focus();
            this.activeElement = document.activeElement;
        }
    }

    private handleKeyArrowUp(){
        if (this.activeElement.previousElementSibling){
            (this.activeElement.previousElementSibling as HTMLElement).focus();
            this.activeElement = document.activeElement;
        }
    }

    private setFocusForNextElement(){
        const rowNumber = this.activeElement.getAttribute('row');

        let  nextElement;
        if (document.querySelector('tr[row="'+rowNumber+'"]')){
            nextElement = document.querySelector('tr[row="'+rowNumber+'"]').nextElementSibling;
        }else{
            this.lastRowViewport = this.lastRowViewport-2;
            nextElement = document.querySelector('tr[row="'+this.lastRowViewport+'"]').nextElementSibling;
        }

        if( nextElement !== null ){
            (nextElement as HTMLElement).focus();
            this.activeElement = document.activeElement;
        }
    }


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
    //         this.scrollBoxElementRef.nativeElement.scrollTop =( (this.currentRow - (this.qtdRowClient - 1)) * this.datatable.rowHeight );
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
