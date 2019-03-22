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
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';

import * as json from './autocompletedemo-dataproperties.json';
import * as jsonEvt from './autocompletedemo-events.json';
import { DumpDataService } from '../../shared/services/dumpdata';
import { TlAutoComplete } from '../../../../projects/truly-ui/src/components/autocomplete/autocomplete';
import { HttpClient } from '@angular/common/http';
import { PersonService } from './http.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component( {
  selector: 'app-autocomplete',
  templateUrl: './autocompletedemo.component.html',
  styleUrls: [ './autocompletedemo.component.scss' ],
  providers: [ DumpDataService ]
} )
export class AutoCompleteDemoComponent implements OnInit {

  public dataTableProperties;

  public dataEvents;

  public dataBasic;

  public dataLazy = [];

  public lazy = [];

  public result;

  public data;

  public length = 1000;

  public example = '{{item.firstName}}';

  public lazyCut = [];

  public formGroup = new FormGroup({
    client: new FormControl(''),
    clientLazy: new FormControl('')
  });

  constructor( public dataDumpService: DumpDataService ) {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvt.events;
    this.dataBasic = this.dataDumpService.createRandomData( 100 );
    this.dataLazy = this.dataDumpService.createRandomData( 1000 );
    this.data = this.dataLazy.slice();
  }

  ngOnInit() {
    setTimeout(() => {
      this.lazy = this.data.splice(0, 50);
    }, 2000);
  }

  onFilter( event ) {
    const termo = event['fields']['firstName']['value'];
    setTimeout(() => {
      this.lazyCut = this.dataLazy.filter((item) => String(item.firstName).toLowerCase().includes(String(termo).toLowerCase()) );
      this.length = this.lazyCut.length;
      this.lazy = this.lazyCut.slice(0, 50);
    }, Math.random() * 1000 + 200);
  }

  onLazyLoad( event ) {
    const termo = event['fields']['firstName']['value'];
    setTimeout(() => {
      if (termo.length > 0) {
        const filter = this.lazyCut.filter((item) => String(item.firstName).toLowerCase().includes(String(termo).toLowerCase()));
        this.lazy = filter.splice(event.skip, event.limit);
        return;
      }
      this.lazy = this.dataLazy.slice(event.skip, event.limit);
    }, Math.random() * 1000 + 200);
  }

}
