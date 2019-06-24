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
  SimpleChanges,
  ChangeDetectorRef,
  OnChanges
} from '@angular/core';
import {TlTimelineItem} from './parts/timeline-item/timeline-item';
import {FixedPositionDirective} from '../misc/fixed-position.directive';

@Component({
  selector: 'tl-timeline',
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.scss'],
})
export class TlTimeline implements OnInit, OnChanges {

  @Input() data: Array<any> = [];

  @Input() align = 'left';

  @Input() height = '400px';

  @Input() keyTitle = 'title';

  @Input() keyText = 'text';

  @Input() keyDate = 'date';

  @Input() rowData = 20;

  @Input() mode = 'basic';

  @Input() color = 'primary';

  @Output() lazyLoad: EventEmitter<any> = new EventEmitter();

  @ViewChild('listComponent', {static: true}) listComponent: ElementRef;

  @ContentChild(TemplateRef, {static: true}) customTemplate: TemplateRef<any>;

  public side = false;

  public dataFull: Array<any> = [];

  private scrollTop = 0;

  private lastScrollTop = 0;

  private scrollDirection = 'DOWN';

  public skip = 0;

  public take = 20;

  public PERCENTAGE_LIMIT = 0.1;

  public loadingMoreData = false;

  constructor(public change: ChangeDetectorRef) {}

  ngOnInit() {}

  public controlSide() {
    this.side = !this.side;
    return this.side;
  }

  public listenerToScroll($event) {
    this.setScrollTop($event);
    this.setScrollDirection();
    this.isScrollDown() ? this.handleScrollDown() : this.handleScrollUp();
    this.setLastScrollTop();
  }

  private setScrollTop($event) {
    this.scrollTop = $event.target.scrollTop;
  }

  private setLastScrollTop() {
    this.lastScrollTop = this.scrollTop;
  }

  private setScrollDirection() {
    this.scrollDirection = (this.scrollTop > this.lastScrollTop) ? 'DOWN' : 'UP';
  }

  private isScrollDown() {
    return this.scrollDirection === 'DOWN';
  }

  private isLimitDown() {
    const scrollHeight = this.listComponent.nativeElement.scrollHeight;
    const offsetHeight = this.listComponent.nativeElement.offsetHeight;
    const limitDown = scrollHeight - (scrollHeight * this.PERCENTAGE_LIMIT) - offsetHeight;
    return this.scrollTop > limitDown;
  }

  private isLimitUp() {
    const scrollHeight = this.listComponent.nativeElement.scrollHeight;
    const limitUp = scrollHeight * this.PERCENTAGE_LIMIT;
    return this.scrollTop < limitUp;
  }

  handleScrollDown() {
    if (this.isLimitDown()) {
      if (!this.loadingMoreData) {
        this.getDataLazy();
      }
    }
  }

  handleScrollUp() {
    if (this.isLimitUp()) {
      if (!this.loadingMoreData) {
        if (this.skip > 0) {}
      }
    }
  }

  haveMoreData() {
    return this.take < this.data['total'];
  }

  getDataLazy() {
    if (this.haveMoreData()) {
      this.skip = this.rowData + this.skip;
      this.take = this.skip + this.rowData;
      this.loadingMoreData = true;
      this.lazyLoad.emit({skip: this.skip, take: this.take});
    }
  }

  onInit(lineItem: TlTimelineItem, item, index) {
    lineItem.setTemplateView(item, index);
  }

  ngOnChanges(change: SimpleChanges) {
    this.loadingMoreData = false;
    this.change.detectChanges();
    if (change['data'].currentValue.data) {
      this.dataFull.push(...change['data'].currentValue.data);
    }
  }

}
