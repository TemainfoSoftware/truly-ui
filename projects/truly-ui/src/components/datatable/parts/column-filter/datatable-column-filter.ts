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
    Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { debounceTime } from 'rxjs/internal/operators';
import { Subject } from 'rxjs';
import { I18nService } from '../../../i18n/i18n.service';
import { FilterEventMetadata, FilterMetadata } from '../../metadatas/filter.metadata';


@Component({
    selector: '[tlColumnFilter]',
    templateUrl: './datatable-column-filter.html',
    styleUrls: ['./datatable-column-filter.scss']
})
export class TlDatatabaleColumnFilter implements OnInit {

    @Input('tlColumnFilter') tlColumnFilter;

    @Output() filterEvent: EventEmitter<any> = new EventEmitter();

    public filters: FilterMetadata = { matchMode: {}, value: {} };

    get filterPlaceholder() {
      return this.i18n.getLocale().Datatable.filterPlaceholder;
    }

    get dropdownResetPlaceholder() {
      return this.i18n.getLocale().Datatable.dropdownResetPlaceholder;
    }

    private subject =  new Subject();

    constructor( private i18n: I18nService ) {}

    ngOnInit() {
        this.subject.pipe( debounceTime(600) ).subscribe((event) => {
            if (event !== undefined) {
                const filterEventObject = this.makeFilterEvent();
                this.filterEvent.emit( filterEventObject ) ;
            }
        });
    }

    onChangeFilter(event) {
        this.subject.next(event);
    }

    makeFilterEvent(): FilterEventMetadata {
        const filter: FilterEventMetadata = { filters: {} };

        this.tlColumnFilter.forEach((value) => {
            if (this.filters.value[value.field]) {
                filter.filters[value.field] = {
                    value: this.filters.value[value.field],
                    matchMode: this.filters.matchMode[value.field] ? this.filters.matchMode[value.field] : 'startsWith'
                };
            }
        });

        return Object.keys(filter.filters).length ? filter : { filters: {} };
    }
}
