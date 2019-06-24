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

import { AfterViewInit, Component, forwardRef, Inject, ViewChild, ElementRef } from '@angular/core';
import { TlDatatable } from '../../datatable';
import { DatatableHelpersService } from '../../services/datatable-helpers.service';
import { TlDatatabaleColumnFilter } from '../column-filter/datatable-column-filter';
import { TlDatatableFilterService } from '../../services/datatable-filter.service';
import { TlDatatableColumn } from '../column/datatable-column';
import { TlDatatableSortService } from '../../services/datatable-sort.service';

@Component( {
    selector: 'tl-datatable-header',
    templateUrl: './datatable-header.html',
    styleUrls: [ './datatable-header.scss', '../../datatable.scss' ],
    providers: [ DatatableHelpersService ]
} )
export class TlDatatableHeader implements AfterViewInit {

    @ViewChild(TlDatatabaleColumnFilter, {static: true} ) columnsFilter;

    @ViewChild('datatableHeader', {static: true} ) datatableHeader: ElementRef;

    private filderOrder = 1;

    private sortField;

    constructor( @Inject( forwardRef( () => TlDatatable ) ) public dt: TlDatatable,
                 public helperService: DatatableHelpersService,
                 public filterService: TlDatatableFilterService,
                 private sortService: TlDatatableSortService ) {}

    ngAfterViewInit() {
        if (this.columnsFilter !== undefined) {
          this.columnsFilter.filterEvent.subscribe( ( value ) => {
            this.filterService.setFilter( value );
          } );
        }

        this.dt.getScrollingHorizontal().subscribe((leftValue) => {
          this.datatableHeader.nativeElement.firstElementChild.scrollLeft = leftValue;
        });
    }

    onClick(column: TlDatatableColumn) {
      if (( column.sortable === false )  || ( this.dt.allowSortColumn === false)) {
        return;
      }
      this.filderOrder = this.filderOrder * -1;
      if (this.sortField !==  column.field) {
        this.sortField = column.field;
        this.filderOrder = 1;
      }

      this.sortService.setSort( {sorts: {column: column.field, sortBy: this.filderOrder}} );
    }

    getSortOrder(column) {
      let order = 0;
      if (this.sortField === column.field) {
        order = this.filderOrder;
      }
      return order;
    }

}
