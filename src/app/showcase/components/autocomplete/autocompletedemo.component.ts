/*
 MIT License

 Copyright (c) 2018 Temainfo Software

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
import { Component, ViewChild } from '@angular/core';

import * as json from './autocompletedemo-dataproperties.json';
import * as jsonEvt from './autocompletedemo-events.json';
import { DumpDataService } from '../../shared/services/dumpdata';
import { TlAutoComplete } from '../../../components/autocomplete/autocomplete';

@Component( {
  selector: 'app-autocomplete',
  templateUrl: './autocompletedemo.component.html',
  styleUrls: [ './autocompletedemo.component.scss' ],
  providers: [ DumpDataService ]
} )
export class AutoCompleteDemoComponent {

  public dataTableProperties;

  public dataEvents;

  public dataLazy;

  public dataBasic;

  public timeout;

  public take = 70;

  public formOptions1;

  public result;

  public result2;

  public example = '{{item.firstName}}';

  @ViewChild( TlAutoComplete ) autocomplete;

  constructor( public dataDumpService: DumpDataService, ) {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvt.events;
    setTimeout( () => {
      this.dataBasic = this.dataDumpService.createRandomData( 1000 );
      this.dataLazy = {
        'data': this.getDataFromService( 0, this.take ),
        'total': this.dataBasic.length
      };
    }, 2000 );

    this.formOptions1 = {
      title: 'New Client',
      icon: 'ion-person-add',
      draggable: true,
      width: '500px',
      height: '500px',
      maximizable: true,
      minimizable: true,
      fullscreen: false
    };

  }

  onClickItem($event) {
    console.log('click', $event);
  }

  onSelectItem($event) {
    console.log('select', $event);
  }

  onLazyLoad( event ) {
    clearTimeout( this.timeout );
    this.timeout = setTimeout( () => {
      this.dataLazy = {
        'data': this.getDataFromService( event.skip, event.take ),
        'total': this.dataBasic.length
      };
    }, 200 );
  }


  getDataFromService( skip, take ) {
    return this.dataBasic.slice( skip, take );
  }

}
