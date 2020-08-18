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
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter, Inject,
  Input, LOCALE_ID,
  OnDestroy,
  OnInit, Optional,
  Output, Self,
  ViewChild
} from '@angular/core';
import {MakeProvider} from '../core/base/value-accessor-provider';
import {FormControlName, NgControl, NgModel} from '@angular/forms';
import {TlInput} from '../input/input';
import {TlCalendar} from '../calendar/calendar';

import {ReverseFormatDate} from '../core/helper/reverseformatdate';
import {ConnectedOverlayPositionChange} from '@angular/cdk/overlay';
import {KeyEvent} from '../core/enums/key-events';
import {ValueAccessorBase} from '../input/core/value-accessor';
import {Subscription} from 'rxjs';

export interface DateOject {
  day: number;
  month: number;
  year: number;
}

@Component({
  selector: 'tl-datepicker',
  templateUrl: './datepicker.html',
  styleUrls: ['./datepicker.scss']
})

export class TlDatePicker extends ValueAccessorBase<Date | string> implements OnInit, AfterContentInit, OnDestroy {

  @Input() label = '';

  @Input() name = '';

  @Input() labelSize = '';

  @Input() textAlign = 'left';

  @Input() iconAfter;

  @Input() isoDate = true;

  @Input() labelPlacement = 'left';

  @Input() formatDate = 'dd/mm/yyyy';

  @Input() readonly = false;

  @Input() disabled = false;

  @Input() placeholder = 'Datepicker Field';

  @Input() clearButton = true;

  @Input() autoClose = false;

  @Input() openOnFocus = true;

  @Output() selectDay: EventEmitter<any> = new EventEmitter<any>();

  @Output() completeMask: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(TlCalendar, {static: true}) calendar;

  @ViewChild(TlInput, {static: true}) tlInput: TlInput;

  @ViewChild('calendarContent', {static: true}) calendarContent;

  @ViewChild('arrow', {static: true}) arrow;

  public isOpen = false;

  public positionOverlay = '';

  public description = '';

  public trigger;

  public date = new Date();

  private year = new Date().getFullYear();

  private month = new Date().getMonth();

  private day = new Date().getDate();

  private subscription = new Subscription();

  constructor(private changes: ChangeDetectorRef,
              @Inject(LOCALE_ID) public locale: string,
              @Optional() @Self() public ngControl: NgControl) {
    super();
    this.setControl();
  }

  get control() {
    return this.ngControl.control;
  }

  setControl() {
    if ( this.ngControl ) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.setDateMask();
  }

  ngAfterContentInit() {
    this.decomposeDate(this.value);
    this.listenControlChanges();
  }

  private listenControlChanges() {
    if (this.control) {
      this.subscription.add(this.control.valueChanges.subscribe((date: Date) => {
        if (!this.isOpen && date) {
          this.decomposeDate(date);
          return;
        }
        if ( !date ) {
          this.description = null;
        }
      }));
    }
  }

  private decomposeDate(date) {
    if (date && this.value) {
      const dateStr = new Date(date).toLocaleDateString(this.locale, {timeZone: 'UTC'});
      const formatted = ReverseFormatDate(this.stringUnmasked(dateStr), this.formatDate);
      this.description = this.getFormattedDate(formatted);
      this.setDateObject(formatted);
    }
  }

  private setDateMask() {
    this.tlInput.mask = this.getMask();
  }

  private setDateObject(dateObject: DateOject) {
    this.day = dateObject.day;
    this.month = dateObject.month - 1;
    this.year = dateObject.year;
  }

  private getMask() {
    const format = this.formatDate.toLowerCase();
    const dd = format.replace('dd', '00');
    const mm = dd.replace('mm', '00');
    return mm.replace('yyyy', '0000');
  }

  private getObjectValues() {
    return {
      day: this.day,
      fullDate: this.date,
      month: this.month,
      year: this.year
    };
  }

  private handleAutoClose() {
    if (this.autoClose) {
      this.isOpen = false;
    }
  }

  private handleOpenOnFocus() {
    if (this.openOnFocus) {
      this.isOpen = true;
    }
  }

  private getFormattedDate($event) {
    let strDate;
    const date = this.formatDate;
    strDate = date.replace('dd', this.formatDayAndMonth($event.day));
    strDate = strDate.replace('mm', this.formatDayAndMonth($event.month));
    strDate = strDate.replace('yyyy', $event.year);
    return strDate;
  }

  private setValue($event) {
    this.description = this.getFormattedDate({...$event, month: $event.month + 1});
    this.value = $event.fullDate.toISOString();
  }

  private formatDayAndMonth(value) {
    if (String(value).length === 1) {
      return `0${value}`;
    }
    return value;
  }

  handleDateChange() {
    const date = ReverseFormatDate(this.description, this.formatDate);
    if (!isNaN(date.day) && !isNaN(date.month) && !isNaN(date.year)) {
      this.setDateObject(date);
      this.date = new Date(date.year, date.month - 1, date.day);
      this.changes.detectChanges();
    }
  }

  onBlur() {
    this.propagateTouched();
  }

  onCompleteMask() {
    const timeout = setTimeout(() => {
      this.handleDateChange();
      if (this.isoDate) {
        this.value = this.getObjectValues().fullDate.toISOString();
      } else {
        this.value = this.getObjectValues().fullDate;
      }
      this.changes.detectChanges();
      this.completeMask.emit(this.getObjectValues());
      clearTimeout(timeout);
    }, 500);

  }

  onDateInputFocus() {
    if (this.value && !this.isOpen) {
      const inputDate = ReverseFormatDate(this.stringUnmasked(this.description), this.formatDate);
      this.setDateObject(inputDate);
    }
    this.handleOpenOnFocus();
  }

  onSelectDay($event) {
    this.setDateObject($event);
    this.date = $event.fullDate;
    this.selectDay.emit($event);
    this.setValue($event);
    this.handleAutoClose();
    this.changes.detectChanges();
  }

  onPositionChange($event: ConnectedOverlayPositionChange) {
    this.positionOverlay = $event.connectionPair.originY;
  }

  onBackDropClick() {
    this.isOpen = false;
  }

  onClearInput($event) {
    this.value = null;
    $event.stopPropagation();
  }

  handleArrowKeys($event) {
    const object = {
      [KeyEvent.ARROWUP]: () => this.handleArrowUp($event),
      [KeyEvent.ARROWDOWN]: () => this.handleArrowDown($event),
      [KeyEvent.TAB]: () => this.handleTab(),
      [KeyEvent.ESCAPE]: () => this.handleEscape($event),
      [KeyEvent.ARROWRIGHT]: () => $event.preventDefault(),
      [KeyEvent.ARROWLEFT]: () => $event.preventDefault(),
    };
    if (object[$event]) {
      object[$event]();
    }
  }

  private handleArrowUp($event) {
    if (this.isOpen) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  private handleTab() {
    if (this.isOpen) {
      this.isOpen = false;
      this.changes.detectChanges();
    }
  }

  private handleEscape($event) {
    if (this.isOpen) {
      $event.preventDefault();
      $event.stopPropagation();
      this.isOpen = false;
    }
  }

  private handleArrowDown($event) {
    if (this.isOpen) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  private stringUnmasked(value) {
    return String(value).replace(/(\|-|_|\(|\)|:|\+)/gi, '');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
