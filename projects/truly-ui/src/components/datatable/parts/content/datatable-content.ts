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
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ElementRef, EventEmitter, Input, OnDestroy, Output, QueryList, ViewChild, ViewChildren
} from '@angular/core';
import { TlDatatableRow } from '../row/datatable-row';
import {Observable, Subscription} from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import {ActiveDescendantKeyManager} from '@angular/cdk/a11y';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { TlDatatableColumn } from '../column/datatable-column';
import { I18nService } from '../../../i18n/i18n.service';
import { DatatableDataSource } from '../../services/datatable-datasource.service';
import { ContextMenuService } from '../../../contextmenu/services/contextmenu.service';
import { ContextMenuInterface } from '../../../contextmenu/interfaces/context-menu.interface';
import {scrollIntoView} from '../../../core/helper/scrollIntoView';

@Component( {
  selector: 'tl-datatable-content',
  templateUrl: './datatable-content.html',
  styleUrls: [ './datatable-content.scss', '../../datatable.scss' ],
  providers: [ContextMenuService],
  changeDetection: ChangeDetectionStrategy.OnPush,
} )
export class TlDatatableContent implements AfterViewInit, OnDestroy {

  @Input('dataSource') dataSource: Array<any> | Observable<Array<any>> | DataSource<any>;

  @Input( 'data' ) data: Array<any>;

  @Input('rowHeight') rowHeight: number;

  @Input('heightViewPort') heightViewPort: number;

  @Input('columns') columns: Array<TlDatatableColumn>;

  @Input( 'contextMenuItems' ) contextMenuItems: ContextMenuInterface[];

  @Output('rowClick') rowClick = new EventEmitter();

  @Output('rowDbClick') rowDbClick = new EventEmitter();

  @Output( 'rowSelect' ) rowSelect: EventEmitter<any> = new EventEmitter();

  @ViewChild('viewport', {static: true}) viewport: CdkVirtualScrollViewport;

  @ViewChildren(TlDatatableRow) items: QueryList<TlDatatableRow>;

  @ViewChild('datableContent') datableContent: ElementRef;

  private keyManager: ActiveDescendantKeyManager<TlDatatableRow>;

  private subscription = new Subscription();

  constructor(private i18n: I18nService,
              private changes: ChangeDetectorRef,
              private contextMenuService: ContextMenuService) {}

  ngAfterViewInit() {
    this.keyManager = new ActiveDescendantKeyManager(this.items).withTypeAhead();
    this.setFirstItemSelected();
  }

  onRowClick( rowItem: TlDatatableRow, row, index ) {
    this.rowClick.emit({ row: row, index: index });
    this.keyManager.setActiveItem(rowItem);
    this.setContentFocus();
  }

  contextmenu($event, rowItem: TlDatatableRow, row, index ) {
    if (this.contextMenuItems && this.contextMenuItems.length > 0) {
      this.contextMenuService.create($event, rowItem.element, this.contextMenuItems, { row: row, index: index });
      return false;
    }
  }

  setContentFocus() {
    this.datableContent.nativeElement.focus();
  }

  isEmpty() {
    return (
      (this.dataSource as Array<any>).length === 0 ||
      ( this.dataSource as DatatableDataSource).isEmpty
    );
  }

  emptyText() {
    return this.i18n.getLocale().Datatable.notFoundText;
  }

  mouseDown( $event ) {
    if ( this.dataSource instanceof DatatableDataSource) {
      ( this.dataSource as DatatableDataSource ).setNavigating( true );
    }
  }

  mouseUp( $event ) {
    if ( this.dataSource instanceof DatatableDataSource) {
      ( this.dataSource as DatatableDataSource ).setNavigating( false );
    }
  }

  onKeydown(event) {
    this.keyManager.onKeydown(event);
    if (this.keyManager.activeItem) {
      scrollIntoView( this.keyManager.activeItem.element.nativeElement );
    }
  }

  onKeyup() {
    this.rowSelect.emit( this.keyManager.activeItem );
  }

  setFirstItemSelected() {
    setTimeout(() => {
      this.setContentFocus();
      this.keyManager.setActiveItem(0);
      this.rowSelect.emit( this.keyManager.activeItem );
      this.changes.detectChanges();
    }, 100);
  }

  setSelectedItem() {
    setTimeout(() => {
      this.setContentFocus();
      this.keyManager.setActiveItem( this.keyManager.activeItemIndex );
      this.rowSelect.emit( this.keyManager.activeItem );
      this.changes.detectChanges();
    }, 100);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
