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
import { Component, Input, OnInit } from '@angular/core';
import { FilterOptionsService } from '../../services/datatable-filter-options.service';

@Component( {
    selector: 'tl-datatable-column',
    template: '',
    providers: [FilterOptionsService]
} )
export class TlDatatableColumn implements OnInit {

    @Input( 'field' ) field = '';

    @Input( 'title' ) title = '';

    @Input( 'alignment' ) alignment = 'center';

    @Input('width') width: string;

    @Input('type') type = 'text';

    @Input('showFilter') showFilter = true;

    @Input('showFilterOptions') showFilterOptions = true;

    @Input('filterOptions') filterOptions = [];

    private filterOptionsService = new FilterOptionsService();

    constructor() {
        this.setFilterOptions();
    }

    ngOnInit() {
        this.setTitle();
    }

    setTitle() {
        if (!this.title) {
            if (this.field) {
                this.title = this.field.toUpperCase();
            }
        }
    }

    setFilterOptions() {
        if (!this.filterOptions.length){
            this.filterOptions = this.filterOptionsService.getOptionsByType( this.type );
        }
    }
}
