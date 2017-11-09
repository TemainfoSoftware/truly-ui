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
import { Component } from '@angular/core';

import * as json from './autocompletedemo-dataproperties.json';
import { DumpDataService } from '../../shared/services/dumpdata';

@Component( {
  selector : 'app-autocomplete',
  templateUrl : './autocompletedemo.component.html',
  styleUrls : [ './autocompletedemo.component.scss' ],
  providers : [ DumpDataService ]
} )
export class AutoCompleteDemoComponent {

  public dataTableProperties;

  public dataLazy;

  public dataBasic;

  public timeout;

  public take = 70;

  public formOptions1;

  public result;

  public example = '{{item.firstName}}';

  constructor( public dataDumpService: DumpDataService, ) {
    this.dataTableProperties = json.dataProperties;
    this.dataBasic = this.dataDumpService.createRandomData( 1000 );

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


    this.dataLazy = {
      'data': this.getDataFromService( 0, this.take ),
      'total': this.dataBasic.length
    };
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
/*
  newClient() {
    this.formService.createForm(NewClient, this.formOptions1, (modalResult) => {
      if (modalResult.formResult) {
        this.handleSaveClient(modalResult.formResult);
      }
    });
  }

  handleSaveClient(result) {
    this.dataFormService.saveDataForm(result);
    this.result = this.dataFormService.getDataForm();
    this.result['id'] = this.dataBasic.length + 1;
    this.dataBasic.push(this.result);
  }*/

  getDataFromService( skip, take ) {
    return this.dataBasic.slice( skip, take );
  }

}
