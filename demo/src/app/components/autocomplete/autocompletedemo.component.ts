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
import { ChangeDetectionStrategy, Component, ViewContainerRef } from '@angular/core';

import * as json from './autocompletedemo-dataproperties.json';
import { DumpDataService } from '../../shared/services/dumpdata';
import { DialogService } from "../../../../../src/dialog/dialog.service";

@Component( {
  selector : 'app-autocomplete',
  templateUrl : './autocompletedemo.component.html',
  styleUrls : [ './autocompletedemo.component.scss' ],
  providers : [ DumpDataService ]
} )
export class AutoCompleteDemo {

  private dataTableProperties;

  public dataLazy;

  public dataBasic;

  private modalOptions;

  private timeout;

  private take = 70;

  private example = '{{item.firstName}}';

  constructor( private dataDumpService: DumpDataService,
               private view: ViewContainerRef, private dialogService: DialogService ) {
    this.dataTableProperties = json.dataProperties;


    this.dialogService.setView( this.view );
    // this.simpleData = [ 'Adilson', 'William', 'Silvio', 'Maicon', 'Jaisson', 'Moacyr', 'Marcio', 'Laura', 'Anne', 'Nige' ];
    this.dataBasic = this.dataDumpService.createRandomData( 1000 );

    this.modalOptions = {
      title: 'New Modal',
      icon: 'ion-monitor',
      draggable: true,
      width: '500px',
      height: 'auto',
      maximizable: true,
      minimizable: true
    };

    this.dataLazy = {
      "data": this.getDataFromService( 0, this.take ),
      "total": this.dataBasic.length
    }
  }

  getDataFromService( skip, take ) {
    return this.dataBasic.slice( skip, take );
  }

  onLazyLoad( event ) {
    clearTimeout( this.timeout );
    this.timeout = setTimeout( () => {
      this.dataLazy = {
        "data": this.getDataFromService( event.skip, event.take ),
        "total": this.dataBasic.length
      };
    }, 2000 );
  }

  newClient() {
    this.dialogService.confirmation( 'Are you sure ?', ( modalResult ) => {
      console.log( 'Return', modalResult );
    } )
  }

}
