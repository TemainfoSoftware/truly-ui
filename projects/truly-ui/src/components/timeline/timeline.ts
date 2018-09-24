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

import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { TlTimelineItem } from './parts/timeline-item/timeline-item';

@Component({
  selector: 'tl-timeline',
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.scss'],
})
export class TlTimeline implements OnInit {

  @Input() data: Array<any>;

  @Input() align = 'left';

  @Input() title: string;

  @Input() text: string;

  @Input() date: number;

  @Input() side = 'left';

  @ContentChild(TemplateRef) customTemplate: TemplateRef<any>;

  constructor() {}

  ngOnInit() {}

  onInit(lineItem: TlTimelineItem, item?, index?) {
    lineItem.setTemplateView(item, index);
  }

  public controlSide() {
    this.side = (this.side === 'left') ? 'right' : 'left';
    return this.side;
  }

}
