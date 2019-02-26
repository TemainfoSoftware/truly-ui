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
  OnInit,
  Input,
  Output,
  EventEmitter, ChangeDetectorRef
} from '@angular/core';
import { StopwatchService } from './services/stopwatch-service';

@Component({
  selector: 'tl-stopwatch',
  templateUrl: './stopwatch.html',
  styleUrls: ['./stopwatch.scss'],
})
export class TlStopwatch implements OnInit {

  @Input() color = 'basic';

  @Input() width = '240px';

  @Input() height = '60px';

  @Input() resetOnStop = false;

  @Input('initialTime')
  set initialTime(value: string) {
    this.stopWatchService.hour = parseInt(value.substr(0, 2), 10);
    this.stopWatchService.minute = parseInt(value.substr(3, 2), 10);
    this.stopWatchService.second = parseInt(value.substr(6, 2), 10);
  }

  @Output() returnTime = new EventEmitter();

  public currentHour = '00:00:00';

  constructor( private stopWatchService: StopwatchService, private change: ChangeDetectorRef ) {}

  ngOnInit() {
    this.stopWatchService.refreshHour.subscribe((hour: string) => {
      this.currentHour = hour;
      this.change.detectChanges();
    });
  }

  start() {
    this.stopWatchService.start();
  }

  stop() {
    this.stopWatchService.stop();
    this.returnTime.emit({time: this.stopWatchService.getHour()});
    if (this.resetOnStop) { this.reset(); }
  }

  reset() {
    this.stopWatchService.reset();
  }

}
