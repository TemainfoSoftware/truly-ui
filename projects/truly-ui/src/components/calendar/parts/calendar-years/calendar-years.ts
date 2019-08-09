import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'tl-years',
  templateUrl: './calendar-years.html',
  styleUrls: ['./calendar-years.scss']
})
export class TlCalendarYears {

  @Input() currentDate: Date;

  @Input('currentRange')
  set currentRange( value: { start: number; end: number } ) {
    this._currentRange = value;
    this.rangeArray =
      Array.from({ length: value.end - value.start + 1 }).map(( item, index ) => value.start + index);
  }

  get currentRange() {
    return this._currentRange;
  }

  @Output() selectYear = new EventEmitter();

  public rangeArray = [];

  public years = [
    { name: 'January', initials: 'jan' },
    { name: 'February', initials: 'feb' },
    { name: 'March', initials: 'mar' },
    { name: 'April', initials: 'apr' },
    { name: 'May', initials: 'may' },
    { name: 'June', initials: 'jun' },
    { name: 'July', initials: 'jul' },
    { name: 'August', initials: 'aug' },
    { name: 'September', initials: 'sep' },
    { name: 'October', initials: 'oct' },
    { name: 'November', initials: 'nov' },
    { name: 'December', initials: 'dec' }
    ];

  private _currentRange;

  constructor() {}

  selectDate( year: number )  {
    const date = new Date( year, this.currentDate.getMonth(), this.currentDate.getDate() );
    this.selectYear.emit( date );
  }

}
