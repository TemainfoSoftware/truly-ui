'use strict';
/*
 MIT License

 Copyright (c) 2019 Temainfo Software

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
  AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Inject, Renderer2,
  ViewChild, OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { I18nService } from '../../../i18n/i18n.service';
import { TlDatatable } from '../../datatable';
import { KeyEvent } from '../../../core/enums/key-events';
import { DatatableHelpersService } from '../../services/datatable-helpers.service';
import { DatePipe } from '@angular/common';

import * as objectPath from 'object-path';

@Component( {
    selector: 'tl-datatable-scrollable-mode',
    templateUrl: './datatable-scrollable-mode.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: [ './datatable-scrollable-mode.scss', '../../datatable.scss' ],
    providers: [DatatableHelpersService, DatePipe]
} )
export class TlDatatableScrollableMode implements AfterContentInit, OnDestroy {

    @ViewChild( 'listComponent', {static: true}  ) listComponent: ElementRef;

    @ViewChild( 'listBody', {static: true}  ) listBody: ElementRef;

    public loading = false;

    public foundRecords = true;

    public bodyHeight = 0;

    public translateY = 0;

    get notFountText() {
      return this.i18n.getLocale().Datatable.notFoundText;
    }

    private quantityVisibleRows = 0;

    private quantityInVisibleRows = 0;

    private lastRowViewport = 0;

    private firstRowViewport = 0;

    private cursorViewPortPosition = 1;

    private wrapOnRemaining = 5;

    private scrollTop = 0;

    private lastScrollTop = 0;

    private lastScrollLeft = 0;

    private scrollDirection = 'DOWN';

    private skip = 0;

    private take = 0;

    private scrollLockAt = 0;

    private lastRecordProcessed: any;

    private mouseClicked = false;

    private activeElement: Element;

    private elementTR: ElementRef;

    private elementTD: ElementRef;

    private subscriptions = new Subscription();

    constructor( @Inject( forwardRef( () => TlDatatable ) ) public dt: TlDatatable,
                 private renderer: Renderer2,
                 private cd: ChangeDetectorRef,
                 private helperService: DatatableHelpersService,
                 private i18n: I18nService,
                 private datePipe: DatePipe
    ) {}

    ngAfterContentInit() {
        this.setProprertiesFromTable();
        this.addListenerToDataSource();
        this.addListenerToScroll();
        this.addListenerReceiveFocus();
        this.firstRender();
    }

    onMouseDown() {
        this.mouseClicked = true;
    }

    onMouseUp() {
        this.mouseClicked = false;
    }


    onClick(event) {
        this.activeElement = event.target.parentElement;
    }

    onKeydown( $event ) {
        $event.preventDefault();
        if ( this.dt.loading) {
            return;
        }
        switch ( $event.keyCode ) {
            case KeyEvent.ARROWDOWN: this.handleKeyArrowDown(); break;
            case KeyEvent.ARROWUP: this.handleKeyArrowUp(); break;
            case KeyEvent.HOME: this.handleKeyHome( $event ); break;
            case KeyEvent.END: this.handleKeyEnd( $event ); break;
            case KeyEvent.PAGEUP: this.handleKeyPageUp(  ); break;
            case KeyEvent.PAGEDOWN: this.handleKeyPageDown( ); break;
        }
    }

    private setProprertiesFromTable() {
        this.bodyHeight = this.dt.rowHeight * this.dt.totalRows;
        this.quantityVisibleRows = this.dt.heightViewPort / this.dt.rowHeight;
        this.quantityInVisibleRows = Math.round( ( this.dt.rowsPage - this.quantityVisibleRows ) / 2 );
        this.setlastRowViewport();

        this.dt.getLoading().subscribe((value) => {
            this.loading = value;
            this.cd.markForCheck();
        });
    }

    private addListenerToDataSource() {
        this.subscriptions.add(
          this.dt.dataSourceService.onChangeDataSourceEmitter.subscribe((dataSource: any) => {
              this.foundRecords = dataSource.length > 0;
              this.renderList(this.skip, dataSource);
              this.dt.loading = false;
              this.bodyHeight = this.dt.rowHeight * this.dt.totalRows;
              this.cd.detectChanges();
              this.setFocusWhenChangeData();
          })
        );
    }

    private addListenerToScroll() {
        this.listComponent.nativeElement.addEventListener('scroll', ($event) => {

            if ( this.isScrollLeft() ) {
                this.handleScrolHorizontal();
                this.setLastScrollLeft();
                return;
            }

            this.setScrollTop();
            this.setlastRowViewport();
            this.setScrollDirection();
            this.isScrollDown() ? this.handleScrollDown() : this.handleScrollUp();
            this.setLastScrollTop();
        });
    }

    private handleScrolHorizontal() {
        this.dt.scrollingHorizontalSubject.next(this.listComponent.nativeElement.scrollLeft);
    }

    private firstRender() {
        setTimeout(() => {
            this.renderList( 0, this.dt.dataSourceService.datasource );
            this.activeElement = this.listBody.nativeElement.rows[0];
            this.cd.detectChanges();
        }, 1);
    }

    private handleKeyPageUp() {
        this.listComponent.nativeElement.scrollTop -= this.quantityVisibleRows * this.dt.rowHeight;

        let rowNumber =  ( this.lastRowViewport ) - (this.quantityVisibleRows * 2) ;
        rowNumber = rowNumber < 0 ? 0 : rowNumber;
        const queryElementBy = 'tr[row="' + rowNumber  + '"]';
        const elementToFind = this.listBody.nativeElement.querySelector(queryElementBy);
        this.setFocus( elementToFind );
    }

    private handleKeyPageDown() {
        this.listComponent.nativeElement.scrollTop += this.quantityVisibleRows * this.dt.rowHeight;

        let rowNumber =  ( this.lastRowViewport - 1 ) + this.quantityVisibleRows;
        rowNumber = rowNumber > this.dt.totalRows ? this.dt.totalRows - 1 : rowNumber;
        const queryElementBy = 'tr[row="' + rowNumber + '"]';
        const elementToFind = this.listBody.nativeElement.querySelector(queryElementBy);
        this.setFocus( elementToFind );
    }

    private handleKeyEnd( event: KeyboardEvent  ) {
        if ( event.ctrlKey ) {
            this.listComponent.nativeElement.scrollTop = this.dt.rowHeight * this.dt.totalRows;
        }
    }

    private handleKeyHome( event: KeyboardEvent ) {
        if ( event.ctrlKey ) {
            this.listComponent.nativeElement.scrollTop = 0;
        }
    }

    private handleScrollDown() {
        const lastChildElem = this.listBody.nativeElement.rows[ this.listBody.nativeElement.rows.length - 1 ];
        if ( !lastChildElem ) {
            return this.handleScrollFast();
        }

        const clientRect = lastChildElem.getBoundingClientRect();
        const parentClientRect = this.listComponent.nativeElement.getBoundingClientRect();
        if ( !clientRect ) {
            return this.handleScrollFast();
        }

        if ( this.hasScrollDown( clientRect, parentClientRect ) ) {
            const skip = this.lastRowViewport - this.quantityInVisibleRows - this.quantityVisibleRows;
            let take = skip + (this.quantityInVisibleRows * 2) + this.quantityVisibleRows;
            take = take > this.dt.totalRows ? this.dt.totalRows : take;
            this.scrollLockAt = this.scrollTop;
            this.renderPageData( skip, take );
        }
    }

    private hasScrollDown(clientRect, parentClientRect) {
        const clientBottom = clientRect.bottom;
        const pointOfWrap = (this.wrapOnRemaining * this.dt.rowHeight);
        const parentBottom = parentClientRect.bottom;
        const dataGreathenRowPage = this.dt.totalRows >= this.dt.rowsPage;
        return ( clientBottom < parentBottom + pointOfWrap ) && ( !(this.take === this.dt.totalRows)) && dataGreathenRowPage;
    }


    private handleScrollUp() {
        const firstElement = this.listBody.nativeElement.children[ 0 ];
        const parentClientRect = this.listComponent.nativeElement.getBoundingClientRect();

        if ( !firstElement ) {
            return this.handleScrollFast();
        }

        if (!( ( firstElement.offsetTop <= this.scrollTop ) && (  this.listBody.nativeElement.rows.length > 0 ) ) ) {
            return this.handleScrollFast();
        }

        const clientRect = firstElement.getBoundingClientRect();
        if ( this.hasScrollUp( clientRect, parentClientRect ) ) {
            let skip = this.lastRowViewport - this.quantityInVisibleRows - this.quantityVisibleRows - this.wrapOnRemaining;
            let take = skip + this.quantityVisibleRows + (this.quantityInVisibleRows * 2);
            if ( skip < 0 ) {
                skip = 0;
                take = this.dt.rowsPage;
            }
            this.scrollLockAt = this.scrollTop;
            this.renderPageData( skip, take );
        }
    }

    private hasScrollUp(clientRect, parentClientRect) {
        const clientTop = clientRect.top;
        const pointOfWrap = (this.wrapOnRemaining * this.dt.rowHeight);
        const parentTop = parentClientRect.top;

        return clientTop > parentTop - pointOfWrap && ( !(this.skip === 0));
    }

    private handleScrollFast( ) {
        const currentStartIndex = Math.floor( this.scrollTop / this.dt.rowHeight );
        let skip = currentStartIndex - this.quantityInVisibleRows;
        let take = currentStartIndex + this.quantityVisibleRows + this.quantityInVisibleRows;
        if ( skip < 0 ) {
            skip = 0;
            take = this.dt.rowsPage;
        }
        this.renderPageData( skip, take );
    }

    private renderPageData( skip, take ) {
        this.dt.loading = true;
        this.skip = skip;
        this.take = take;
        this.dt.dataSourceService.loadMoreData(skip, take, true);
        this.cd.markForCheck();
    }

    private renderList( lastRow, dataSource ) {
        this.removeChilds();
        this.lastRecordProcessed = dataSource[0];
        this.translateY = ( lastRow) * this.dt.rowHeight;
        for ( let row = 0; row < dataSource.length; row++ ) {
            this.createElementTR( row, lastRow);
            this.createElementsTD( row, dataSource );
            this.addEventEnterClickToListElement( row, dataSource, lastRow );
            this.addEventClickToListElement( row, dataSource, lastRow );
        }
    }

    private createElementTR( row, lastRow) {
        this.elementTR = new ElementRef( this.renderer.createElement( 'tr' ) );
        this.renderer.setAttribute( this.elementTR.nativeElement, 'row', String( (row + lastRow) ) );
        this.renderer.setAttribute( this.elementTR.nativeElement, 'tabindex', String( (row + lastRow) ) );
        this.renderer.setStyle( this.elementTR.nativeElement, 'height', this.dt.rowHeight + 'px' );
        this.renderer.addClass( this.elementTR.nativeElement, 'ui-row' );
        this.renderer.appendChild( this.listBody.nativeElement, this.elementTR.nativeElement );
    }

    private createElementsTD( row, dataSource ) {
        for ( let collumn = 0; collumn < this.dt.columns.length; collumn++ ) {

            const classAlignColumn = this.helperService.getClassAlignment( this.dt.columns[ collumn ].alignment );

            this.elementTD = new ElementRef( this.renderer.createElement( 'td' ) );
            this.renderer.addClass(  this.elementTD.nativeElement, 'ui-cel' );
            this.renderer.addClass(  this.elementTD.nativeElement, classAlignColumn );
            this.renderer.setStyle(  this.elementTD.nativeElement, 'height', this.dt.rowHeight + 'px' );
            this.elementTD.nativeElement.innerHTML = this.getContentFormated( row, collumn, dataSource );
            this.renderer.appendChild( this.listBody.nativeElement.children[ row ],  this.elementTD.nativeElement );
        }
    }

    private getContentFormated( row, collumn, dataSource ) {
      const content = this.getContent( row, collumn, dataSource );
      switch ( this.dt.columns[ collumn ].type ) {
        case 'date' : {
          return this.datePipe.transform( content, this.dt.columns[ collumn ].format );
        }
        default : return content;
      }
    }

    private getContent( row, collumn, dataSource ) {
      return objectPath.get(dataSource[ row ], this.dt.columns[ collumn ].field);
    }

    private removeChilds() {
        if ( this.listBody.nativeElement.children.length > 0 ) {
            this.listBody.nativeElement.innerHTML = '';
        }
    }

    private setlastRowViewport() {
        this.lastRowViewport = Math.round( ( this.dt.heightViewPort + this.scrollTop  ) / this.dt.rowHeight );
        this.firstRowViewport = this.lastRowViewport - this.quantityVisibleRows + 1;
    }

    private setScrollTop() {
        if (this.dt.loading && (!this.mouseClicked)) {
            this.listComponent.nativeElement.scrollTop = this.scrollLockAt;
            return;
        }
        this.scrollTop = this.listComponent.nativeElement.scrollTop;
    }

    private setLastScrollTop() {
        this.lastScrollTop = this.scrollTop;
    }

    private setLastScrollLeft() {
        this.lastScrollLeft =  this.listComponent.nativeElement.scrollLeft;
    }
    private setScrollDirection( ) {
        this.scrollDirection =  (this.scrollTop > this.lastScrollTop ) ? 'DOWN' : 'UP';
    }

    private isScrollDown() {
        return this.scrollDirection === 'DOWN';
    }

    private isScrollLeft() {
        return this.lastScrollLeft !== this.listComponent.nativeElement.scrollLeft;
    }

    private addEventEnterClickToListElement( row, dataSource , lastRow ) {
      this.elementTR.nativeElement.addEventListener( 'keyup', (event) => {
        this.dt.onRowSelect( dataSource[ row ], row + lastRow  );
      });
      this.elementTR.nativeElement.addEventListener( 'keydown', (event) => {
        if ( event.keyCode === KeyEvent.ENTER ) {
          return this.handleRowSelectItem( dataSource[ row ], row + lastRow );
        }

        if ( event.keyCode === KeyEvent.ARROWDOWN ) {
          let rowNumber = row + 1;
          if (( (rowNumber + lastRow) >= this.dt.totalRows)) {
            rowNumber = row;
          }

          return this.handleRowSelectItem( dataSource[ rowNumber ], rowNumber + lastRow );
        }

        if ( event.keyCode === KeyEvent.ARROWUP ) {
          let rowNumber = row - 1;
          rowNumber = rowNumber < 0 ? 0 : rowNumber;
          return this.handleRowSelectItem( dataSource[ rowNumber ], rowNumber + lastRow );
        }

      });
    }

    private addListenerReceiveFocus() {
      this.subscriptions.add(this.dt.receiveFocus.subscribe(( activeItem ) => {
        const queryElementBy = 'tr[row="' + activeItem  + '"]';
        const elementToFind = this.listBody.nativeElement.querySelector(queryElementBy);
        this.setFocus( elementToFind );
      }));
    }

    private addEventClickToListElement( row, dataSource , lastRow ) {
        this.elementTR.nativeElement.addEventListener( 'click', () => {
            this.handleClickItem( dataSource[ row ], row + lastRow );
        } );
    }

    private handleRowSelectItem( item, index ) {
      this.setActiveElement();
      this.getCursorViewPortPosition();
    }

    private handleClickItem( item, index ) {
        this.setActiveElement();
        this.dt.onRowClick( item, index );
        this.getCursorViewPortPosition();
    }

    private getCursorViewPortPosition() {
        const indexItemInList: any = this.activeElement.getAttribute( 'row' );
        this.cursorViewPortPosition = ( ( this.lastRowViewport - indexItemInList )  - this.quantityVisibleRows - 1) * -1;
    }

    private handleKeyArrowDown() {
        this.setFocusInNextElement();
    }

    private handleKeyArrowUp() {
        this.setFocusInPreviousElement();
    }

    private setFocusInPreviousElement() {
        if (this.activeElement.previousElementSibling) {
            if ( this.cursorViewPortPosition > 1  ) {
                this.cursorViewPortPosition --;
            } else {
                this.listComponent.nativeElement.scrollTop -= this.dt.rowHeight;
            }
            this.setFocus( this.activeElement.previousElementSibling );
        }
    }

    private setFocusInNextElement() {
        if (this.activeElement.nextElementSibling) {
            if ( this.cursorViewPortPosition < this.quantityVisibleRows ) {
                 this.cursorViewPortPosition ++;
            } else {
              this.listComponent.nativeElement.scrollTop += this.dt.rowHeight;
            }
            this.setFocus( this.activeElement.nextElementSibling );
        }
    }

    private setActiveElement() {
       if (this.activeElement) {
         this.renderer.removeClass(this.activeElement, 'ui-selected-row');
       }
       this.activeElement = document.activeElement;
       this.renderer.addClass(this.activeElement, 'ui-selected-row');

    }

    private setFocusWhenChangeData() {
       this.setFocus( this.getFocusElementOnChangeData() ) ;
    }

    private getFocusElementOnChangeData() {
        if (document.activeElement.nodeName === 'INPUT') {
            return document.activeElement;
        }

        if ( this.isScrollDown() ) {
             const elementToFind = 'tr[row="' + ( this.lastRowViewport - 1 ) + '"]';
             return this.listBody.nativeElement.querySelector(elementToFind);
        } else {
            const elementToFind = 'tr[row="' + ( ( this.lastRowViewport - this.quantityVisibleRows ) ) + '"]';
            return this.listBody.nativeElement.querySelector(elementToFind);
        }
    }

    private setFocus( htmlElement ) {
        if ( this.mouseClicked ) {
          return;
        }

        if ( ( htmlElement !== null ) && ( htmlElement !== undefined)) {
            ( htmlElement as HTMLElement ).focus();
            this.setActiveElement();
            this.getCursorViewPortPosition();
        }
    }

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }
}
