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
import { Input, Component, OnInit, AfterContentChecked } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component( {
  selector: 'tl-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: [ './sidebar.scss' ],
} )

export class TlSidebar implements OnInit, AfterContentChecked {

  @Input() opened = false;

  @Input() mode: 'push' | 'over' | 'slide' = 'push';

  @Input() width = 300;

  @Input() position = 'start';

  @Input() dockWidth = 80;

  @Input() dock = false;

  public docked = false;

  public toggleChange = new Subject();

  constructor() {}

  ngOnInit() {
    if (this.dock && this.position === 'end') {
      throw Error('The Dock property is unavailable in [end] position');
    }
    if (this.dock) {
      this.opened = true;
      this.docked = true;
      this.width = this.dockWidth;
    }
  }

  ngAfterContentChecked() {
    if (this.mode !== 'over') {
      this.toggleChangeEmitter();
    }
  }

  toggle() {
    if (this.docked && this.opened) {
      this.width = 300;
      this.docked = false;
      return;
    }

    if (this.dock && this.opened) {
      this.width = this.dockWidth;
      return this.docked = true;
    }

    this.opened = !this.opened;
    this.toggleChangeEmitter();
  }

  toggleChangeEmitter() {
    this.toggleChange.next( { 'sidebar': this }
    );
  }

}
