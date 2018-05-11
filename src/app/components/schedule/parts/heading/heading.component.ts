import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tl-schedule-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {

  @Input() views: ['day' | 'week' | 'month' | 'workWeek' | 'dayList' | 'weekList'] = ['day', 'dayList'];

  @Output() changeView = new EventEmitter();

  @Output() changeNavigator = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
