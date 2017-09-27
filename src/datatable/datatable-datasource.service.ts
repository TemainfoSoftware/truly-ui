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

import { ChangeDetectorRef, EventEmitter, Injectable, NgZone, SimpleChanges } from '@angular/core';
import { TlDatatable } from './datatable';
import { DataMetadata } from '../core/types/datametadata';

@Injectable()
export class TlDatatableDataSource {

    public onChangeDataSourceEmitter: EventEmitter<any> = new EventEmitter();

    public datasource: any;

    private datatable: TlDatatable;

    constructor(  private zone: NgZone ) {}

    onInitDataSource(datatableInstance) {
        this.datatable = datatableInstance;
        this.getRowsInMemory( 0, this.datatable.rowsPage ).then((res) => {
            this.datasource = res;
            this.datatable.setColumns();
        });
        this.refreshTotalRows(this.datatable.data);
    }

    onChangeDataSource( data: SimpleChanges ) {
        const dataChange = data['data'].currentValue;
        if ( ( !data['data'].firstChange ) && dataChange ) {
            this.datasource = dataChange.data;
            this.onChangeDataSourceEmitter.emit(this.datasource);
        }
    }

    updateDataSource( data ) {
        this.datasource  = this.isDataArray( data ) ? data : ( data as DataMetadata ).data;
    }

    getRowsInMemory(skip: number, take: number): Promise<any> {
        return new Promise((resolve) => {
            let data: any = [];
            this.zone.runOutsideAngular(() => {
                data = this.isDataArray( this.datatable.data ) ? this.datatable.data : ( this.datatable.data as DataMetadata ).data;
                data = (data as  Array<any>).slice( skip, take );
            });
            resolve(  data );
        })
    }

    loadMoreData(skip: number, take: number): Promise<boolean> {
       return new Promise(( resolve ) => {
           if (  this.datatable.allowLazy ) {
              this.datatable.lazyLoad.emit({ skip: skip,  take: take });
              return resolve();

           }
           this.getRowsInMemory( skip, take ).then((res) => {
               this.datasource = res;
               this.onChangeDataSourceEmitter.emit(this.datasource);
               return resolve();
           });

       });
    }


    public isDataArray( data: any ) {
        return data instanceof Array;
    }

    private refreshTotalRows( data: any ) {
        if ( this.isDataArray( data ) ) {
            this.datatable.totalRows =  data.length;
            return;
        }
        this.datatable.totalRows = data.total;
    }
}
