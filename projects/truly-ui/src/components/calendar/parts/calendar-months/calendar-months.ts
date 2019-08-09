import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'tl-months',
  templateUrl: './calendar-months.html',
  styleUrls: ['./calendar-months.scss']
})
export class TlCalendarMonths {

  @Input() currentDate: Date;

  @Output() selectMonth = new EventEmitter();

  public months = [
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

  constructor() {}

  selectDate( index: number )  {
    const date = new Date( this.currentDate.getFullYear(), index, this.currentDate.getDate() );
    this.selectMonth.emit( date );
  }

}
