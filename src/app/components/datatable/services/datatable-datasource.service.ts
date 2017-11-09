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
import { TlDatatable } from '../datatable';
import { DataMetadata } from '../../core/types/datametadata';
import { FilterEventMetadata } from '../metadatas/filter.metadata';
import { DatasourceService } from '../interfaces/datasource.service';
import { TlDatatableFilterConstraints } from './datatable-filter-constraints.service';

@Injectable()
export class TlDatatableDataSource implements DatasourceService {

    public onChangeDataSourceEmitter: EventEmitter<any> = new EventEmitter();

    public datasource: any;

    private filtredData = [];

    private filter: FilterEventMetadata = null;

    private datatable: TlDatatable;

    constructor(  private zone: NgZone, private cd: ChangeDetectorRef, private filterConstraints: TlDatatableFilterConstraints ) {}

    onInitDataSource(datatableInstance) {
        this.datatable = datatableInstance;
        this.getRowsInMemory( 0, this.datatable.rowsPage ).then((res) => {
            this.datasource = res;
            this.datatable.columnService.setColumns();
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

    loadMoreData(skip: number, take: number, filter?: any): Promise<boolean> {
        return new Promise(( resolve ) => {
            if (  this.datatable.allowLazy ) {
                this.datatable.loading = true;
               this.datatable.lazyLoad.emit({ skip: skip,  take: take, filters: filter.filters });
               return resolve();

            }
            this.getRowsInMemory( skip, take, filter ).then((res) => {
               this.datasource = res;
               this.onChangeDataSourceEmitter.emit(this.datasource);
               return resolve();
            });

        });
    }

    setFilter(value: FilterEventMetadata) {
        if (!this.existsFilter(value)) {
            this.filtredData = [];
        }
        this.loadMoreData(0, this.datatable.rowsPage, value);
    }

    isDataArray( data: any ) {
        return data instanceof Array;
    }

    private getRowsInMemory(skip: number, take: number, filter?: any): Promise<any> {
        return new Promise((resolve) => {
            let data: any;
            data = this.getData(filter);
            data = this.filterData(data, filter);
            // data = this.sortData(data, sort);
            this.refreshTotalRows(data);
            data = this.sliceData(data, skip, take);

            resolve( data  );
        });
    }

    private refreshTotalRows( data: any ) {
        if ( this.isDataArray( data ) ) {
            this.datatable.totalRows =  data.length;
            return;
        }
        this.datatable.totalRows = data.total;
    }

    private getData(filter) {
        if (this.filtredData.length && (!this.existsFilter(filter)) ) {
            return this.filtredData;
        }
        return this.isDataArray( this.datatable.data ) ? this.datatable.data : ( this.datatable.data as DataMetadata ).data;
    }

    private sortData(data, sort) {

    }

    private sliceData(data, skip, take) {
        return (data as Array<any>).slice( skip, take );
    }

    private filterData(data, filter) {
        if (! this.existsFilter(filter) ) { return data; }
        this.filtredData = [];
        this.zone.runOutsideAngular(() => {
            data.forEach( value => {
                let match = true;
                const filterArray = Object.keys( filter.filters );

                for ( let valueIndex = 0; valueIndex < filterArray.length; valueIndex++ ) {

                    const dataValue = value[ filterArray[ valueIndex ] ];
                    const filterValue = filter.filters[ filterArray[ valueIndex ] ].value.toLowerCase();
                    const matchMode = filter.filters[ filterArray[ valueIndex ] ].matchMode;

                    if ( ! this.filterConstraints[matchMode]( dataValue, filterValue) ) {
                        match = false;
                        break;
                    }
                }

                if ( match ) {
                    this.filtredData.push( value );
                }
            } );
        });

        return this.filtredData;

    }

    private existsFilter(filter) {
        return  (filter !== undefined) && Object.keys(filter.filters).length;
    }
}
