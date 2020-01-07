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
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import {TlTimelineItem} from './parts/timeline-item/timeline-item';
import {DataSourceList} from '../core/classes/datasource-list';
import {Subscription} from 'rxjs';

@Component({
  selector: 'tl-timeline',
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.scss'],
})
export class TlTimeline implements OnInit {

  @Input('data')
  set data(value) {
    this._data = value;
    this.setUpData(value);
  }

  get data() {
    return this._data;
  }

  @Input() align = 'left';

  @Input() height = '400px';

  @Input() keyTitle = 'title';

  @Input() totalLength = 0;

  @Input() keyText = 'text';

  @Input() keyDate = 'date';

  @Input() rowsPage = 20;

  @Input() mode = 'basic';

  @Input() lazyMode = false;

  @Input() loading = false;

  @Input() color = 'primary';

  @Output() lazyLoad: EventEmitter<any> = new EventEmitter();

  @ViewChild('listComponent', {static: true}) listComponent: ElementRef;

  @ContentChild(TemplateRef, {static: true}) customTemplate: TemplateRef<any>;

  public dataSource: DataSourceList;

  public skip = 0;

  public take = 20;

  public loadingMoreData = false;

  public nothingFound = false;

  private _data = [];

  private subscription = new Subscription();

  constructor(public change: ChangeDetectorRef) {}

  ngOnInit() {}

  setUpData( value? ) {
    if ( !this.dataSource ) {
      this.dataSource = new DataSourceList( {
        dataSource: value,
        pageSize: this.rowsPage,
        totalLength: this.totalLength,
        lazyMode: this.lazyMode
      } );
      this.listenLoadData();
    }
    this.loading = false;
    this.dataSource.setData( value );
    this.setNotFound( value.length === 0 );
  }

  private listenLoadData() {
    if ( !this.dataSource ) {
      return;
    }
    this.subscription.add( this.dataSource.loadMoreData.subscribe( ( data: any ) => {
      this.lazyLoad.emit( { skip: data.skip, limit: data.limit } );
    } ) );
  }

  private setNotFound( value: boolean ) {
    this.nothingFound = value;
  }

  onInit(lineItem: TlTimelineItem, item, index) {
    lineItem.setTemplateView(item, index);
  }

}
