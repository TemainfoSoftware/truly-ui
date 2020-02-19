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
  Component, EventEmitter, Input, OnDestroy, OnInit, Output
} from '@angular/core';
import { debounceTime } from 'rxjs/internal/operators';
import { Subject, Subscription } from 'rxjs';
import { I18nService } from '../../../i18n/i18n.service';
import { FilterEventMetadata, FilterMetadata } from '../../metadatas/filter.metadata';
import { TlDatatableColumn } from '../column/datatable-column';


@Component({
    selector: '[tlColumnFilter]',
    templateUrl: './datatable-column-filter.html',
    styleUrls: ['./datatable-column-filter.scss']
})
export class TlDatatabaleColumnFilter implements OnInit, OnDestroy {

    @Input('tlColumnFilter') tlColumnFilter: TlDatatableColumn[];

    @Output() filterEvent: EventEmitter<any> = new EventEmitter();

    public filters: FilterMetadata = { matchMode: {}, value: {} };

    get filterPlaceholder() {
      return this.i18n.getLocale().Datatable.filterPlaceholder;
    }

    get dropdownResetPlaceholder() {
      return this.i18n.getLocale().Datatable.dropdownResetPlaceholder;
    }

    private subject =  new Subject();

    private subscription =  new Subscription();

    constructor( private i18n: I18nService ) {}

    ngOnInit() {
        this.subscription.add(
          this.subject.pipe( debounceTime(600) ).subscribe((event) => {
            if (event !== undefined) {
                const filterEventObject = this.makeFilterEvent();
                this.filterEvent.emit( filterEventObject ) ;
            }
          })
        );
    }

    onChangeFilter(event) {
      this.subject.next(event);
    }

    onClear(event) {
      this.subject.next(event);
    }

    makeFilterEvent(): FilterEventMetadata {
        const filter: FilterEventMetadata = { filters: {} };

        this.tlColumnFilter.forEach((column) => {
            if (this.filters.value[column.field]) {
                filter.filters[column.field] = {
                    value: this.getValueByType(column),
                    matchMode: this.filters.matchMode[column.field] ? this.filters.matchMode[column.field] : 'startsWith'
                };
            }
        });

        return Object.keys(filter.filters).length ? filter : { filters: {} };
    }

    getValueByType( column: TlDatatableColumn ): any {
      switch ( column.type ) {
        case 'text' :
          return this.filters.value[column.field];
        case 'number' :
          return parseInt(this.filters.value[column.field], 10);
        case 'date' :
          return this.filters.value[column.field];
        default :
          return  this.filters.value[column.field];
      }
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
}
