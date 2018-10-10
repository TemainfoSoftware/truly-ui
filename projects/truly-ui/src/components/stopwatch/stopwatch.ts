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

import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'tl-stopwatch',
  templateUrl: './stopwatch.html',
  styleUrls: ['./stopwatch.scss'],
})
export class TlStopwatch implements OnInit {

  public hour = 0;

  public minute = 0;

  public second = 0;

  public LIMIT_HOUR = 24;

  public LIMIT_MINUTE = 60;

  public LIMIT_SECOND = 60;

  public isPause = true;

  public interval;

  @Input() color = 'basic';

  @Input() width = '240px';

  @Input() height = '60px';

  @Output() returnTime = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  isLimitHour() {
    return this.hour === this.LIMIT_HOUR;
  }

  isLimitMinute() {
    return this.minute === this.LIMIT_MINUTE;
  }

  isLimitSecond() {
    return this.second === this.LIMIT_SECOND;
  }

  resetHour() {
    this.hour = 0;
  }

  resetMinute() {
    this.minute = 0;
  }

  resetSecond() {
    this.second = 0;
  }

  incrementHour() {
    this.resetMinute();
    this.hour++;
  }

  incrementMinute() {
    this.resetSecond();
    this.minute++;
  }

  incrementSecond() {
    this.second++;
  }

  start() {
    this.isPause = false;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.isPause) { return; }
      this.incrementSecond();
      if (this.isLimitSecond()) {
        this.incrementMinute();
      }
      if (this.isLimitMinute()) {
        this.incrementHour();
      }
      if (this.isLimitHour()) {
        this.resetHour();
      }
    }, 1000);
  }

  stop() {
    this.isPause = true;
    const time = this.formatTime(this.hour) + ':' + this.formatTime(this.minute) + ':' + this.formatTime(this.second);
    this.returnTime.emit({time: time});
  }

  formatTime(digit) {
    return digit <= 9 ? '0' + digit : digit;
  }

}
