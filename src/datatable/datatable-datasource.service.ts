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

import { Injectable, Injector, SimpleChanges } from '@angular/core';
import { TlDatatable } from './datatable';
import { DataMetadata } from '../core/types/datametadata';

@Injectable()
export class TlDatatableDataSource{

    public datasource: Array<any>;

    private datatable: TlDatatable;

    private fistRow: number;

    private lastRow: number;
f
    constructor( injector: Injector ){
        setTimeout(()=>{ this.datatable = injector.get(TlDatatable) })
    }

    onInitDataSource(){
        setTimeout(()=>{
            this.datasource = this.getRowsInMemory(0,this.datatable.rowsPage);
        })
    }

    onChangeDataSource( data : SimpleChanges ) {

        let dataChange = data['data'].currentValue;
        if ( dataChange ) {
            if (data['data'].firstChange){
                if (  !this.datatable.lazy ) {
                    this.datasource = this.getRowsInMemory(0,this.datatable.rowsPage);
                }
                return this;
            }else{
                this.datasource = dataChange.data;
            }
        }
        return this;
    }

    getRowsInMemory(skip: number, take: number){
        return this.datatable.datasource.data.slice(skip, skip + take);
    }

    loadMoreData(skip: number, take: number){
        if (  this.datatable.lazy ){
              this.datatable.lazyLoad.emit({ skip: skip,  take: take });
              return this;
        }
        this.datasource = this.getRowsInMemory(skip, take);
        return this;
    }
}