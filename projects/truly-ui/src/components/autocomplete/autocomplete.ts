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
import {
  Component, Input, Optional, Inject, OnInit, OnChanges,
  EventEmitter, Output, ChangeDetectorRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { MakeProvider } from '../core/base/value-accessor-provider';
import { ElementBase } from '../input/core/element-base';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, NgModel } from '@angular/forms';
import { DataSourceAutocomplete } from './parts/classes/datasource-autocomplete';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';

@Component( {
  selector: 'tl-autocomplete',
  templateUrl: './autocomplete.html',
  styleUrls: [ './autocomplete.scss' ],
  providers: [ MakeProvider( TlAutoComplete ) ],
} )
export class TlAutoComplete extends ElementBase<string> implements OnInit, OnChanges {

  @Input() data = [];

  @Input() totalLength = 1000;

  @Input() pageSize = 100;

  @Input() lazyMode = false;

  @Input() itemSize = 50;

  @Input() debounceTime = 200;

  @Input() keyText = '';

  @Input() keyValue = '';

  @Input() labelPlacement = 'left';

  @Input() labelSize = '100px';

  @Input() label = '';

  @Input() placeholder = 'Search...';

  @Output() lazyLoad: EventEmitter<any> = new EventEmitter();

  public dataSource: DataSourceAutocomplete;

  public model: NgModel;

  public selected = null;

  public isOpen = false;

  public focused = false;

  public positionOverlay;

  public searchControl = new FormControl( '' );

  constructor( @Optional() @Inject( NG_VALIDATORS ) validators: Array<any>, @Optional() @Inject( NG_ASYNC_VALIDATORS )
    asyncValidators: Array<any>, private change: ChangeDetectorRef ) {
    super( validators, asyncValidators );
  }

  ngOnInit() {
    this.setUpData();
    this.listenLoadData();
  }

  selectItem($event) {
    this.selected = $event[this.keyText];
    this.value = $event[this.keyValue];
  }

  setUpData() {
    this.dataSource = new DataSourceAutocomplete( {
      dataSource: this.data,
      pageSize: this.pageSize,
      totalLength: this.totalLength,
      lazyMode: this.lazyMode
    } );
  }

  clearValues() {
    this.selected = null;
    this.value = null;
  }

  listenLoadData() {
    this.dataSource.loadMoreData.subscribe( ( data: any ) => {
      this.lazyLoad.emit( { skip: data.skip, limit: data.limit } );
    } );
  }

  onPositionChange( $event: ConnectedOverlayPositionChange ) {
    this.positionOverlay = $event.connectionPair.originY;
    this.change.detectChanges();
  }

  onFilter( $event ) {
    if ($event.length === 0) {
      this.setUpData();
      return;
    }
    this.setUpFilterData($event);
  }

  setUpFilterData(data) {
    this.dataSource = new DataSourceAutocomplete( {
      dataSource: data,
      pageSize: this.pageSize,
      totalLength: this.totalLength,
      lazyMode: this.lazyMode
    } );
  }

  ngOnChanges( changes ) {}

}
