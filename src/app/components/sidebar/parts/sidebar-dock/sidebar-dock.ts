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
import { Input, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component( {
  selector: 'tl-sidebar-dock',
  templateUrl: './sidebar-dock.html',
  styleUrls: [ './sidebar-dock.scss' ],
} )

export class TlSidebarDock implements OnInit {

  @Input() opened = false;

  @Input() mode: 'push' | 'over' | 'slide' = 'push';

  @Input() width = '80px';

  @Input() position = 'start';

  public toggleChange = new Subject();

  public transform = '';

  constructor() {}

  ngOnInit() {}

  toggle() {
    this.opened = !this.opened;
    this.toggleChange.next(
      {
        'opened': this.opened,
        'width': this.width,
        'mode': this.mode,
        'position': this.position,
        'sidebar': this
      }
    );
  }

}
