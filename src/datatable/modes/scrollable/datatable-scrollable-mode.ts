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

 import { AfterContentInit, AfterViewInit, Component, ElementRef, forwardRef, Inject, OnInit, ViewChild } from '@angular/core';
 import { TlDatatable } from '../../datatable';
 import { KeyEvent } from '../../../core/enums/key-events';
 import { TlDatatableDataSource } from '../../datatable-datasource.service';

 @Component({
     selector: 'tl-datatable-scrollable-mode',
     templateUrl: './datatable-scrollable-mode.html',
     styleUrls: ['./datatable-scrollable-mode.scss', '../../datatable.scss']
 })
 export class TlDatatableScrollableMode implements AfterViewInit, OnInit, AfterContentInit {

     @ViewChild( 'scrollBoxTableBody' ) scrollBoxTableBodyElementRef: ElementRef;

     @ViewChild('scrollBox') scrollBoxElementRef: ElementRef;

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

     constructor(  @Inject(forwardRef( () => TlDatatable ) ) private datatable: TlDatatable,  public dataSourceService: TlDatatableDataSource  ) {}

     ngOnInit() {
         this.take = this.datatable.rowsPage;



     }

     ngAfterViewInit() {
         this.clientHeight = this.scrollBoxElementRef.nativeElement.clientHeight;
         this.scrollHeight = this.scrollBoxElementRef.nativeElement.scrollHeight;
         this.pageHeight = this.datatable.rowsPage * this.datatable.rowHeightCalculated;
     }

     ngAfterContentInit(){
         console.log(this.datatable.columns);
        setTimeout(()=>{
            this.containerHeight = this.datatable.rowHeight *  this.datatable.totalRows;
        })


     }

     onScroll($event) {
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
             case KeyEvent.ARROWDOWN: this.handleKeyArrowDown(); break;
             case KeyEvent.ARROWUP: this.handleKeyArrowUp(); break;
             case KeyEvent.HOME: this.handleKeyHome(); break;
             case KeyEvent.END: this.handleKeyEnd(); break;
         }
     }

     emitLazyLoad() {
       //  if ( this.isLazy() ) {

             const qtdRowClient =  Math.round(this.clientHeight / this.datatable.rowHeightCalculated);


             if ( this.scrollPosition > this.scrollTop  ) {
                 if ( this.currentRow  <= this.datatable.totalRows  ) {
                     if ( ( this.currentRow - qtdRowClient ) <=  this.skip ) {
                         this.skip = ( this.skip >= qtdRowClient ) && (  this.currentRow > qtdRowClient  ) ?
                             this.currentRow - (qtdRowClient * 2) : 0;
                         this.take = this.datatable.rowsPage;
                         this.scrollOfTop = (this.scrollTop - qtdRowClient * this.datatable.rowHeightCalculated) > 0 ?
                             this.scrollTop - qtdRowClient * this.datatable.rowHeightCalculated : 0;

                         this.dataSourceService.loadMoreData(this.skip, this.take);
                     }
                 }
             } else if ( this.scrollPosition < this.scrollTop) {
                 if ( this.currentRow  <= this.datatable.totalRows  ) {

                     if ( ( this.take  + this.skip ) <=  this.currentRow ) {
                         this.skip = this.currentRow - qtdRowClient;
                         this.take = this.datatable.rowsPage;
                         this.scrollOfTop = this.scrollTop;
                         this.dataSourceService.loadMoreData(this.skip, this.take);
                     }
                 }
             }
       //  }
     }

     emitEndRow( ) {
         if ( this.scrollTop >= (this.scrollHeight - (this.clientHeight)) ) {
             this.datatable.endRow.emit( {endRow: this.currentRow} )
         }
     }

     emitChangePage( ) {
         if ( this.isLazy() ) {
             const pageNumber = Math.round(this.currentRow / this.datatable.rowsPage);
             if ( (this.scrollTop + this.clientHeight) >= (this.pageHeight * pageNumber) ) {
                 if (pageNumber !== this.pageNumber) {
                     this.pageNumber = pageNumber;
                     this.datatable.pageChange.emit( {page: pageNumber} );
                 }
             }
         }
      }

     handleKeyArrowDown() {
         if ( this.isLastRow() )  {
             return ;
         }
         this.scrollBoxTableBodyElementRef.nativeElement.children[ this.datatable.tabindex + 1 ].focus();
         this.datatable.tabindex = this.datatable.tabindex + 1;
     }

     handleKeyArrowUp() {
         if ( this.isFirstRow() ) {
             return ;
         }
         this.scrollBoxTableBodyElementRef.nativeElement.children[ this.datatable.tabindex - 1 ].focus();
         this.datatable.tabindex = this.datatable.tabindex - 1;
     }

     handleKeyHome() {
         this.scrollBoxTableBodyElementRef.nativeElement.children[ 0 ].focus();
         this.datatable.tabindex = 0 ;
     }

     handleKeyEnd() {
         const lenghtChildren = this.scrollBoxTableBodyElementRef.nativeElement.children.length;
         this.scrollBoxTableBodyElementRef.nativeElement.children[ lenghtChildren - 1 ].focus();
         this.datatable.tabindex = lenghtChildren - 1 ;
     }

     refreshScrollPosition() {
         setTimeout( () => {
             this.scrollPosition = this.scrollTop;
         }, 10)
     }

     getScrollOfTop() {
         return 'translateY(' + this.scrollOfTop + 'px)';
     }

     setScrollTop() {
         this.scrollTop = this.scrollBoxElementRef.nativeElement.scrollTop;
     }

     setCurrentRow() {
         this.currentRow = Math.round( ( this.clientHeight + this.scrollTop  ) / this.datatable.rowHeightCalculated   );
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
