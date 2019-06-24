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
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FixedPositionDirective} from '../../../misc/fixed-position.directive';

@Component({
  selector: 'tl-timeline-item',
  templateUrl: './timeline-item.html',
  styleUrls: ['./timeline-item.scss'],
})
export class TlTimelineItem implements OnInit {

  @Input() align = 'left';

  @Input() side: boolean;

  @Input() date: number;

  @Input() color = 'primary';

  @Input() data: Array<any> = [];

  @Input() template: TemplateRef<any>;

  @Output() initialize: EventEmitter<any> = new EventEmitter();

  @ViewChild('view', {read: ViewContainerRef, static: true}) view: ViewContainerRef;

  public sideString: string;

  constructor() {}

  ngOnInit() {
    this.initialize.emit();
    this.changeSide();
  }

  changeSide() {
    if (this.side) {
      this.sideString = 'left';
    } else {
      this.sideString = 'right';
    }
  }

  setTemplateView(item, index) {
    const node = this.template.createEmbeddedView({
      item: item,
      index: index
    });
    this.insertOnView(node);
  }

  insertOnView(node) {
    this.view.insert(node);
  }

}
