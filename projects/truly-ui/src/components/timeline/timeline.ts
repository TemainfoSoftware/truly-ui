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
  ChangeDetectorRef, OnChanges, SimpleChanges,
} from '@angular/core';
import {TlTimelineItem} from './parts/timeline-item/timeline-item';

@Component({
  selector: 'tl-timeline',
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.scss'],
})
export class TlTimeline implements OnInit, OnChanges {

  @Input('data') data = [];

  @Input() align = 'left';

  @Input() height = '400px';

  @Input() keyTitle = 'title';

  @Input() keyText = 'text';

  @Input() keyDate = 'date';

  @Input() rowsPage = 20;

  @Input() mode = 'basic';

  @Input() color = 'primary';

  @Input() enableUnequalChildrenSizes = true;

  @Input() bufferAmount = 5;

  @Output() lazyLoad: EventEmitter<any> = new EventEmitter();

  @ViewChild('listComponent', {static: true}) listComponent: ElementRef;

  @ContentChild(TemplateRef, {static: true}) customTemplate: TemplateRef<any>;

  public buffer = [];

  public skip = 0;

  public loadingMoreData = false;

  public nothingFound = false;

  constructor(public change: ChangeDetectorRef) {}

  ngOnInit() {}

  onInit(lineItem: TlTimelineItem, item, index) {
    lineItem.setTemplateView(item, index);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadingMoreData = false;
    if ( this.data.length > 0 ) {
      this.buffer = this.buffer.concat(this.data);
      this.nothingFound = false;
      return this.loadingMoreData = false;
    }

    if ( this.data.length === 0 && this.buffer.length > 0 ) {
      this.nothingFound = false;
      return this.loadingMoreData = false;
    }

    if ( this.data.length === 0 && this.buffer.length === 0 ) {
      return this.nothingFound = true;
    }
  }

  fetchMore(event) {
    if (!this.loadingMoreData && this.mode === 'infinite')  {
      if (event.endIndex !== this.buffer.length - 1 ) { return; }
      this.loadingMoreData = true;
      this.skip = this.buffer.length;
      this.lazyLoad.emit( { skip: this.skip, limit: this.rowsPage } );
    }
  }


}
