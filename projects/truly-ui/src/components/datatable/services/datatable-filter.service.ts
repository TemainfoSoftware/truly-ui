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

import { Injectable } from '@angular/core';
import { TlDatatable } from '../datatable';
import { Observable ,  Subject } from 'rxjs';
import { TlDatatableFilterConstraints } from './datatable-filter-constraints.service';
import { FilterEventMetadata } from '../metadatas/filter.metadata';

import * as objectPath from 'object-path';

@Injectable()
export class TlDatatableFilterService {

    private datatable: TlDatatable;

    private subject: Subject<any> = new Subject();

    private filter: FilterEventMetadata;

    public filtredData = [];

    private filterArray = [];

    constructor( private filterConstraints: TlDatatableFilterConstraints ) {}

    onInicializeFilterService( datatable ) {
        this.datatable = datatable;
    }

    onFilter(): Observable<any> {
        return this.subject.asObservable();
    }

    setFilter(filter) {
        this.filter = filter;
        this.filterArray = Object.keys( this.filter.filters );

        if (!this.existsFilter()) {
          this.filtredData = [];
        }
        this.datatable.filterData.next(this.filter);
        this.subject.next();
    }

    existsFilter() {
        return  (this.filter !== undefined) && Object.keys(this.filter.filters).length;
    }

    getFilter() {
        return this.existsFilter() ? this.filter.filters : {};
    }


    filterWithData(data, scrolling) {
        if (! this.existsFilter()) { return data; }
        if ( scrolling ) { return this.filtredData; }

        this.filtredData = [];
        data.forEach( value => {
          let match = true;
          for ( let valueIndex = 0; valueIndex < this.filterArray.length; valueIndex++ ) {
            const dataValue = objectPath.get(value, this.filterArray[ valueIndex ]);
            const filterValue = this.filter.filters[ this.filterArray[ valueIndex ] ].value.toLowerCase();
            const matchMode = this.filter.filters[ this.filterArray[ valueIndex ] ].matchMode;
            if ( ! this.filterConstraints[matchMode]( dataValue, filterValue) ) {
              match = false;
              break;
            }
          }

          if ( match ) { this.filtredData.push( value ); }
        });

        return this.filtredData;
    }
 }
