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

import { Injectable } from '@angular/core';
import { TlDatatable } from '../';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TlDatatableSortService {

  private datatable: TlDatatable;

  private subject = new Subject();

  private sort;

  private sortedData = [];

  onInicializeSortService( datatable ) {
    this.datatable = datatable;
  }

  onSort(): Observable<any> {
    return this.subject.asObservable();
  }


  sortWithData(data, scrolling) {

    if (! this.existsSort()) { return data; }
    if ( scrolling ) { return this.sortedData; }

    data.sort((a, b) => {
      if (a[this.sort.sorts.column] > b[this.sort.sorts.column]) {
        return 1;
      }
      if (a[this.sort.sorts.column] < b[this.sort.sorts.column]) {
        return -1;
      }
      return 0;
    });

    if (this.sort.sorts.sortBy === -1) {
      data.reverse();
    }

    this.sortedData = data;
    return this.sortedData;
  }

  setSort(sort) {
    this.sort = sort;
    this.subject.next();
  }

  getSort() {
    return this.existsSort() ? this.sort.sorts : {};
  }

  existsSort() {
    return (this.sort !== undefined) && Object.keys(this.sort.sorts).length;
  }

}
