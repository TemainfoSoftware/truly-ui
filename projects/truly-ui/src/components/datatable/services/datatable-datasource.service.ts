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

import { Injectable, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { TlDatatable } from '../datatable';
import { DataMetadata } from '../../core/types/datametadata';
import { DatasourceService } from '../interfaces/datasource.service';
import { TlDatatableFilterService } from './datatable-filter.service';
import { TlDatatableSortService } from './datatable-sort.service';

@Injectable()
export class TlDatatableDataSource implements DatasourceService {

    public  onChangeDataSourceEmitter = new Subject();

    public datasource: any;

    private datatable: TlDatatable;

    constructor( private cd: ChangeDetectorRef,
                 private filterService: TlDatatableFilterService,
                 private sortService: TlDatatableSortService ) {}

    onInitDataSource(datatableInstance) {
        this.datatable = datatableInstance;

        this.filterService.onFilter().subscribe(() => {
          this.loadMoreData(0, this.datatable.rowsPage);
        });

        this.sortService.onSort().subscribe((sort) => {
          this.loadMoreData(0, this.datatable.rowsPage);
        });

        // TODO CREATE rowModel 'direct'
        if (this.datatable.data === undefined) {
          return;
        }

        this.getRowsInMemory( 0, this.datatable.rowsPage ).then((res) => {
          this.datasource = res;
          this.refreshTotalRows(this.datatable.data);
          this.datatable.columnService.setColumns();
        });

    }

    onChangeDataSource( data: SimpleChanges ) {
        const dataChange = data['data'].currentValue;
        if ( ( !data['data'].firstChange ) && dataChange ) {
            this.datasource = dataChange.data || dataChange;
            this.refreshTotalRows(this.datatable.data);

            if (  this.datatable.rowModel === 'inmemory' ) {
              this.getRowsInMemory( 0, this.datatable.rowsPage ).then((res) => {
                this.datasource = res;
                this.datatable.columnService.setColumns();
              });
            }

            this.cd.detectChanges();
            this.onChangeDataSourceEmitter.next(this.datasource);
        }
    }

    loadMoreData(skip: number, take: number, scrolling?: boolean): Promise<boolean> {
        return new Promise(( resolve ) => {
            if (  this.datatable.rowModel === 'infinite' ) {
               this.datatable.loading = true;
               this.datatable.loadData.emit({
                 skip: skip,
                 take: take,
                 filters: this.filterService.getFilter(),
                 sorts: this.sortService.getSort()
               });
               return resolve();
            }
            this.getRowsInMemory( skip, take, scrolling ).then((res) => {
               this.datasource = res;
               this.onChangeDataSourceEmitter.next(this.datasource);
               return resolve();
            });
        });
    }


    isDataArray( data: any ) {
        return data instanceof Array;
    }

    private getRowsInMemory(skip: number, take: number, scrolling?: boolean): Promise<any> {
        return new Promise((resolve) => {
            let data: any;
            data = this.getData();
            data = this.filterService.filterWithData(data, scrolling);
            data = this.sortService.sortWithData(data, scrolling);
            this.refreshTotalRows(data);
            data = this.sliceData(data, skip, take);

            resolve( data  );
        });
    }

    private refreshTotalRows( data: any ) {
        if ( this.isDataArray( data ) ) {
            if (this.datatable.recordsCount >= 0 ) {
              return this.datatable.totalRows = this.datatable.recordsCount;
            }
            this.datatable.totalRows =  data.length;
            return;
        }
        this.datatable.totalRows = data.total;
    }

    private getData() {
        if (this.datatable.data === null ) {
          this.datatable.data = [];
          return [];
        }
        return this.isDataArray( this.datatable.data ) ? this.datatable.data : ( this.datatable.data as DataMetadata ).data;
    }

    private sliceData(data, skip, take) {
        return (data as Array<any>).slice( skip, take );
    }

}
