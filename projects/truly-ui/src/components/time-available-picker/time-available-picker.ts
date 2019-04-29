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
  Input, Component, Output, AfterViewInit, EventEmitter, ChangeDetectorRef, SimpleChanges,
  OnChanges
} from '@angular/core';
import { I18nService } from '../i18n/i18n.service';

export interface FilterTime {
  range: DateRange;
  selected: boolean;
}

export interface DateRange {
  start: Date;
  end: Date;
}

@Component( {
  selector: 'tl-time-available-picker',
  templateUrl: './time-available-picker.html',
  styleUrls: [ './time-available-picker.scss' ],
} )
export class TlTimeAvailablePicker implements AfterViewInit, OnChanges {

  @Input() availableTimes: Array<DateRange> = [];

  @Input() color = 'basic';

  @Input() loading = true;

  @Input() maxHeight = '180px';

  @Input() width = '260px';

  @Input() dateValue: Date = new Date();

  @Input() value: Array<DateRange> = [];

  @Output() changeSelect: EventEmitter<any> = new EventEmitter();

  public filterTimes: Array<FilterTime> = [];

  public selectedTime: Array<FilterTime> = [];

  public notFoundMessage = this.i18nService.getLocale().TimeAvailablePicker.notFound;

  constructor( private change: ChangeDetectorRef, private i18nService: I18nService ) {}

  ngAfterViewInit() {
    this.handleValueChange();
  }

  private setUpData() {
    this.resetArrays();
    this.availableTimes.forEach( ( value ) => {
      this.filterTimes.push( { range: value, selected: false } );
    } );
    this.loading = false;
  }

  private resetArrays() {
    this.filterTimes = [];
    this.selectedTime = [];
  }

  private handleValueChange() {
    if ( this.value.length > 0 ) {
      this.value.forEach( ( date: DateRange ) => {
        const dateFilter = this.getDateOnFilter(date);
        if ( dateFilter >= 0) {
          this.filterTimes[dateFilter].selected = true;
        }
      } );
      this.updateTime();
    }
  }

  private getDateOnFilter( date: DateRange ) {
    return this.filterTimes.findIndex( ( item: FilterTime ) =>
      (new Date(item.range.start).getTime() === new Date(date.start).getTime()) &&
    (new Date(item.range.end).getTime() === new Date(date.end).getTime())
    );
  }

  private getSelectedArray() {
    return this.filterTimes.filter( ( item: FilterTime ) => item.selected );
  }

  private deselectAll() {
    this.filterTimes.forEach( ( item: FilterTime ) => item.selected = false );
  }

  private findSelected() {
    return this.filterTimes.findIndex( ( item: FilterTime ) => item.selected );
  }

  private handleDeselect( time: FilterTime ) {
    this.deselectAll();
    time.selected = true;
    this.updateTime();
  }

  setSelectedTime( time: FilterTime, index: number ) {
    const readySelected = this.findSelected();
    if ( ( index === 0 || index === this.filterTimes.length - 1 ) && !(readySelected >= 0) ) {
      this.handleDeselect( time );
      return;
    }
    if ( (this.filterTimes[ this.getFirstIndex( index ) ].selected || this.filterTimes[ this.getLastIndex( index ) ].selected )
      && this.getSelectedArray().length > 1 ) {
      this.handleDeselect( time );
      return;
    }
    if ( readySelected < 0 ) {
      time.selected = !time.selected;
      this.updateTime();
      return;
    }
    time.selected = !time.selected;
    this.selectMany( readySelected, index );

  }

  private getFirstIndex( index ) {
    return index === 0 ? index : index - 1;
  }

  private getLastIndex( index ) {
    return index === this.filterTimes.length - 1 ? index : index + 1;
  }

  private selectMany( readySelected: number, index: number ) {
    this.filterTimes.forEach( ( value, index2, array ) => {
      if ( index2 > readySelected && index2 <= index ) {
        value.selected = true;
      }
      if ( index2 < readySelected && index2 >= index ) {
        value.selected = true;
      }
    } );
    this.updateTime();
  }

  private updateTime() {
    this.selectedTime = [];
    const allSelected = this.filterTimes.filter( ( value ) => value.selected );
    if ( allSelected.length > 0 ) {
      this.selectedTime[ 0 ] = allSelected[ 0 ];
      if ( allSelected.length > 1 ) {
        this.selectedTime[ 1 ] = allSelected[ allSelected.length - 1 ];
      }
    }
    this.changeSelect.emit( this.getSelectedArray().map((item) => item.range) );
    this.change.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['availableTimes']) {
      this.setUpData();
    }
    if (changes['value']) {
      this.handleValueChange();
    }
  }

}
