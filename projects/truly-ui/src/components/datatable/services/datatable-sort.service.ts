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

import { Injectable, ChangeDetectorRef } from '@angular/core';
import { TlDatatable } from '../datatable';
import { Observable ,  Subject } from 'rxjs';

import * as objectPath from 'object-path';

@Injectable()
export class TlDatatableSortService {

  private datatable: TlDatatable;

  public subject = new Subject();

  private sort;

  private sortedData = [];

  constructor(private cd: ChangeDetectorRef) {}

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
      if ( objectPath.get(a, this.sort.sorts.column) > objectPath.get(b, this.sort.sorts.column)) {
        return 1;
      }
      if (objectPath.get(a, this.sort.sorts.column) < objectPath.get(b, this.sort.sorts.column)) {
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
    this.subject.next(sort);
    this.datatable.sortData.next(this.sort);
    this.cd.detectChanges();
  }

  getSort() {
    return this.existsSort() ? this.sort.sorts : {};
  }

  existsSort() {
    return (this.sort !== undefined) && Object.keys(this.sort.sorts).length;
  }

}
