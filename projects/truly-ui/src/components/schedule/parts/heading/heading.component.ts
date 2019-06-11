import {Component, OnInit, Input, Output, EventEmitter, TemplateRef} from '@angular/core';
import { ViewType } from '../../types/view.type';
import { ScheduleI18n } from '../../i18n/schedule-i18n';

@Component({
  selector: 'tl-schedule-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {

  @Input() views: Array<'day' | 'week' | 'month' | 'workWeek' | 'dayList' | 'weekList'> = ['day', 'dayList'];

  @Input() defaultView: 'day' | 'week' | 'month' | 'workWeek' | 'dayList' | 'weekList'  = 'day';

  @Input() currentDate = new Date();

  @Input() texts = ScheduleI18n;

  @Input() eventButtonTemplate: TemplateRef<any>;

  @Output() changeView = new EventEmitter<ViewType>();

  @Output() changeDate = new EventEmitter();

  @Output() newEventClick = new EventEmitter();

  constructor() { }

  ngOnInit() {}
}
