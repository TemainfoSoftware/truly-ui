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
  Component, Output,
  EventEmitter, Input, OnInit,
} from '@angular/core';
import {I18nService} from '../i18n/i18n.service';

export interface ObjectDateCalendar {
  day: number;
  month: number;
  year: number;
  fullDate: Date;
}

@Component({
  selector: 'tl-calendar',
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss'],
})
export class TlCalendar implements OnInit {

  @Input() date = new Date();

  @Input() width = '260px';

  @Input() todayButton = true;

  @Input() borders = false;

  @Input() height = '260px';

  @Output() selectDay: EventEmitter<ObjectDateCalendar> = new EventEmitter();

  @Output() today: EventEmitter<ObjectDateCalendar> = new EventEmitter();

  @Output() doubleClick = new EventEmitter();

  public selectedPanel: 'days' | 'months' | 'years' = 'days';

  public currentRange;

  public todayDescription = this.i18nService.getLocale().Calendar.today;

  public dayOfWeek = this.i18nService.getLocale().Calendar.dayOfWeek;

  constructor(private i18nService: I18nService) {
  }

  ngOnInit() {
  }

  get typeNavigator() {
    switch (this.selectedPanel) {
      case 'days':
        return 'monthyear';
      case 'months':
        return 'year';
      case 'years':
        return 'rangeyear';
    }
  }

  onSelectMonth($event) {
    this.selectedPanel = 'days';
    this.date = $event;
  }

  onClickNavigator($event) {
    this.currentRange = $event.rangeYear;
    switch (this.selectedPanel) {
      case 'days':
        this.selectedPanel = 'months';
        break;
      case 'months':
        this.selectedPanel = 'years';
    }
  }

  getObjectDate() {
    return {
      day: this.date.getDate(),
      month: this.date.getMonth(),
      year: this.date.getFullYear(),
      fullDate: this.date
    };
  }

  clickToday() {
    this.selectedPanel = 'days';
    this.date = new Date();
    this.today.emit(this.getObjectDate());
  }

  onSelectDay($event) {
    this.date = $event;
    this.selectDay.emit(this.getObjectDate());
  }

  onSelectYear($event) {
    this.selectedPanel = 'months';
    this.date = $event;
  }

  onClickPrevious($event) {
    this.currentRange = $event.rangeYear;
    if (this.selectedPanel !== 'years') {
      this.date = $event.fullDate;
    }
  }

  onClickNext($event) {
    this.currentRange = $event.rangeYear;
    if (this.selectedPanel !== 'years') {
      this.date = $event.fullDate;
    }
  }
}

