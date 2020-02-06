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
  ChangeDetectionStrategy,
  Component, EventEmitter,
  forwardRef,
  Inject, Input, OnChanges,
  OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren
} from '@angular/core';
import { TlDatatableRow } from '../row/datatable-row';
import { TlDatatableCell } from '../cell/datatable-cell';
import { Observable } from 'rxjs';
import { DataSource, isDataSource } from '@angular/cdk/collections';
import { TlDatatableColumn } from '../column/datatable-column';
import { I18nService } from '../../../i18n';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DatatableDataSource } from '../../services/datatable-datasource.service';
import { ActiveDescendantKeyManager, FocusKeyManager } from '@angular/cdk/a11y';
import { ENTER } from '@angular/cdk/keycodes';

@Component( {
  selector: 'tl-datatable-content',
  templateUrl: './datatable-content.html',
  styleUrls: [ './datatable-content.scss', '../../datatable.scss' ],
  entryComponents: [ TlDatatableRow, TlDatatableCell ],
  changeDetection: ChangeDetectionStrategy.OnPush,
} )
export class TlDatatableContent implements OnInit, AfterViewInit {

  @Input('dataSource') dataSource: Array<any> | Observable<Array<any>> | DataSource<any>;

  @Input('rowHeight') rowHeight: number;

  @Input('heightViewPort') heightViewPort: number;

  @Input('columns') columns: Array<TlDatatableColumn>;

  @Output('rowClick') rowClick = new EventEmitter();

  @Output('rowDbClick') rowDbClick = new EventEmitter();

  @ViewChild('viewport', {static: true}) viewport: CdkVirtualScrollViewport;

  @ViewChildren(TlDatatableRow) items: QueryList<TlDatatableRow>;

  private keyManager: FocusKeyManager<TlDatatableRow>;

  constructor(private i18n: I18nService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.keyManager = new FocusKeyManager(this.items).withTypeAhead();
  }

  onRowClick( row, index ) {
    this.rowClick.emit({ row: row, index: index });
    this.keyManager.setActiveItem(index);
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

  mouseDown($event) {
    if ( this.dataSource instanceof DatatableDataSource) {
      ( this.dataSource as DatatableDataSource ).setNavigating( true );
    }
  }

  mouseUp($event) {
    if ( this.dataSource instanceof DatatableDataSource) {
      ( this.dataSource as DatatableDataSource ).setNavigating( false );
    }
  }

  onKeydown(event) {
    this.keyManager.onKeydown(event);
  }

}
