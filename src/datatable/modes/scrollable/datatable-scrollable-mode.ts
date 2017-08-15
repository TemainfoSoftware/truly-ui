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
    AfterContentInit, AfterViewInit, Component, ElementRef, forwardRef, Inject, NgZone, OnInit,
    ViewChild
} from '@angular/core';
import { TlDatatable } from '../../datatable';
import { KeyEvent } from '../../../core/enums/key-events';
import { TlDatatableDataSource } from '../../datatable-datasource.service';

@Component( {
    selector : 'tl-datatable-scrollable-mode',
    templateUrl : './datatable-scrollable-mode.html',
    styleUrls : [ './datatable-scrollable-mode.scss', '../../datatable.scss' ]
} )
export class TlDatatableScrollableMode implements AfterViewInit, OnInit, AfterContentInit {

    @ViewChild( 'scrollBoxTableBody' ) scrollBoxTableBodyElementRef: ElementRef;

    @ViewChild( 'scrollBox' ) scrollBoxElementRef: ElementRef;


    public loadingSource = false;

    private scrollPosition: number;

    private containerHeight: number;

    private skip = 0;

    private take = 0;

    private scrollOfTop = 0;

    private clientHeight = 0;

    private scrollTop = 0;

    private scrollHeight = 0;

    private pageHeight = 0;

    private currentRow = 0;

    private pageNumber = 1;

    private Counter = 1;
    private qtdRowClient = 0;


    constructor( @Inject( forwardRef( () => TlDatatable ) ) private datatable: TlDatatable,
                 public dataSourceService: TlDatatableDataSource,
    ) {

    }

    ngOnInit() {
        this.take = this.datatable.rowsPage;
    }

    ngAfterViewInit() {
        this.clientHeight = this.scrollBoxElementRef.nativeElement.clientHeight;
        this.scrollHeight = this.scrollBoxElementRef.nativeElement.scrollHeight;
        this.pageHeight = this.datatable.rowsPage * this.datatable.rowHeight;
        this.qtdRowClient = Math.round( this.clientHeight / this.datatable.rowHeight );
    }

    ngAfterContentInit() {
        this.containerHeight = this.datatable.rowHeight * this.datatable.totalRows;
    }

    onScroll( $event ) {
        this.setScrollTop();
        this.setCurrentRow();

        this.emitEndRow();
        this.emitChangePage();
       this.emitLazyLoad();

        this.refreshScrollPosition();
    }

    onKeydown( $event ) {
        $event.preventDefault();

        switch ( $event.keyCode ) {
            case KeyEvent.ARROWDOWN:
                this.handleKeyArrowDown($event);
                break;
            case KeyEvent.ARROWUP:
                this.handleKeyArrowUp();
                break;
            case KeyEvent.HOME:
                this.handleKeyHome();
                break;
            case KeyEvent.END:
                this.handleKeyEnd();
                break;
        }
    }

    onKeyUp( $event ) {
        switch ( $event.keyCode ) {
            case KeyEvent.ARROWDOWN:
                // setTimeout( () => {
                //  this.scrollBoxElementRef.nativeElement.scrollTop =
                // ( (this.currentRow - (this.qtdRowClient - 1)) * this.datatable.rowHeight );
                // }, 1 );
                break;
        }
    }


    emitLazyLoad() {
        //  if ( this.isLazy() ) {
        // let at: any = document.activeElement;
        //
        //
        // this.Counter = Math.round(
        // (at.offsetTop + this.scrollOfTop - this.scrollBoxElementRef.nativeElement.scrollTop + this.datatable.rowHeight )
        // / this.datatable.rowHeight
        // );

        if ( this.scrollPosition > this.scrollTop ) {
            if ( this.currentRow <= this.datatable.totalRows ) {
                if ( ( this.currentRow - this.qtdRowClient ) <= this.skip ) {
                    this.loadingSource = true;
                    this.skip = ( this.skip >= this.qtdRowClient ) && (  this.currentRow > this.qtdRowClient  )
                        ? this.currentRow - (this.qtdRowClient * 2)
                        : 0;
                    this.skip = this.skip < 0 ? 0 : this.skip;

                    this.take = this.datatable.rowsPage;
                    this.scrollOfTop = (this.scrollTop - this.qtdRowClient * this.datatable.rowHeight) > 0
                                        ? this.scrollTop - this.qtdRowClient * this.datatable.rowHeight
                                        : 0;

                    this.dataSourceService.loadMoreData( this.skip, this.take ).then(( loadingSource: boolean ) => {
                        setTimeout(() => {
                            this.loadingSource = loadingSource;
                        }, 100)
                    });

                }
            }
        } else if ( this.scrollPosition < this.scrollTop ) {
            if ( this.currentRow <= this.datatable.totalRows ) {
                if ( ( this.take + this.skip ) <= this.currentRow ) {
                     this.loadingSource = true;
                     this.skip = this.currentRow - this.qtdRowClient;
                     this.take = this.datatable.rowsPage;
                     this.scrollOfTop = this.scrollTop;

                     this.dataSourceService.loadMoreData( this.skip, this.take ).then(( loadingSource: boolean ) => {
                       setTimeout( () => {
                           this.loadingSource = loadingSource;
                       }, 100);
                     });
                }
            }
        }
        //  }
    }

    emitEndRow() {
        if ( this.scrollTop >= (this.scrollHeight - (this.clientHeight)) ) {
            this.datatable.endRow.emit( { endRow : this.currentRow } )
        }
    }

    emitChangePage() {
        if ( this.isLazy() ) {
            const pageNumber = Math.round( this.currentRow / this.datatable.rowsPage );
            if ( (this.scrollTop + this.clientHeight) >= (this.pageHeight * pageNumber) ) {
                if ( pageNumber !== this.pageNumber ) {
                    this.pageNumber = pageNumber;
                    this.datatable.pageChange.emit( { page : pageNumber } );
                }
            }
        }
    }

    onRowClick( data, index ) {
        const at: any = document.activeElement;
        this.Counter = Math.round(
            (at.offsetTop + this.scrollOfTop - this.scrollBoxElementRef.nativeElement.scrollTop + this.datatable.rowHeight )
            / this.datatable.rowHeight
        );
        this.datatable.onRowClick( data, index );
    }


    handleKeyArrowDown(event) {
        if ( this.dataSourceService.loadingSource === true ) {
            console.log('Loading data...');
            return;
        }
        const at: any = document.activeElement;
        this.setCurrentRow();
        if ( this.isLastRow() ) {
            if ( at !== this.getChildrenOfTable()[ this.getChildrenOfTable().length - 1 ] ) {
                this.scrollBoxTableBodyElementRef.nativeElement.children[ at.tabIndex + 1 ].focus();
                this.datatable.tabindex = at.tabIndex + 1;

                if ( this.Counter >= this.qtdRowClient ) {

                    this.scrollBoxElementRef.nativeElement.scrollTop = (
                        (this.currentRow - (this.qtdRowClient - 1)) * this.datatable.rowHeight
                    );

                } else {
                    this.Counter++
                }
            }
            return;
        }

        this.scrollBoxTableBodyElementRef.nativeElement.children[ this.datatable.tabindex + 1 ].focus();
        this.datatable.tabindex = this.datatable.tabindex + 1;

        if ( this.Counter >= this.qtdRowClient ) {
            this.scrollBoxElementRef.nativeElement.scrollTop = ( (this.currentRow - (this.qtdRowClient - 1)) * this.datatable.rowHeight );
        } else {
            this.Counter++
        }
    }

    getChildrenOfTable() {
        return this.scrollBoxTableBodyElementRef.nativeElement.children;
    }


    handleKeyArrowUp() {
        if ( this.loadingSource === true ) {
            console.log('Loading data...');
            return;
        }
        const at: any = document.activeElement;
        this.setCurrentRow();
        if ( this.isFirstRow() ) {

            if ( at !== this.getChildrenOfTable()[ 0 ] ) {
                this.scrollBoxTableBodyElementRef.nativeElement.children[ at.tabIndex - 1 ].focus();
                this.datatable.tabindex = at.tabIndex - 1;

                if ( this.Counter > 1 ) {
                    this.Counter--
                } else {
                    this.scrollBoxElementRef.nativeElement.scrollTop = (
                        (this.currentRow - (this.qtdRowClient + 1)) * this.datatable.rowHeight
                    );
                }
            }
            return;
        }

        this.scrollBoxTableBodyElementRef.nativeElement.children[ this.datatable.tabindex - 1 ].focus();
        this.datatable.tabindex = this.datatable.tabindex - 1;


        if ( this.Counter > 1 ) {
            this.Counter--
        } else {
            this.scrollBoxElementRef.nativeElement.scrollTop = ( (this.currentRow - (this.qtdRowClient + 1)) * this.datatable.rowHeight);
        }
    }

    handleKeyHome() {
        this.scrollBoxElementRef.nativeElement.scrollTop = 0;
        setTimeout( () => {
            this.getChildrenOfTable()[ 0 ].focus();

            this.Counter = 1
        }, 300 );
    }

    handleKeyEnd() {
        this.scrollBoxElementRef.nativeElement.scrollTop = this.containerHeight;
        setTimeout( () => {
            this.getChildrenOfTable()[ this.getChildrenOfTable().length - 1 ].focus();
            const at: any = document.activeElement;
            this.Counter = Math.round(
                (at.offsetTop + this.scrollOfTop - this.scrollBoxElementRef.nativeElement.scrollTop + this.datatable.rowHeight )
                / this.datatable.rowHeight
            );
        }, 300 );
    }

    refreshScrollPosition() {
        setTimeout( () => {
            this.scrollPosition = this.scrollTop;
        }, 10 )
    }

    getScrollOfTop() {
        return 'translateY(' + this.scrollOfTop + 'px)';
    }

    setScrollTop() {
        this.scrollTop = this.scrollBoxElementRef.nativeElement.scrollTop;
    }

    setCurrentRow() {
        this.currentRow = Math.round( ( this.clientHeight + this.scrollTop  ) / this.datatable.rowHeight );
    }

    isLastRow() {
        return this.datatable.tabindex + 1 > this.scrollBoxTableBodyElementRef.nativeElement.children.length - 1;
    }

    isFirstRow() {
        return this.datatable.tabindex === 0;
    }

    isLazy() {
        return this.datatable.lazy;
    }
}
