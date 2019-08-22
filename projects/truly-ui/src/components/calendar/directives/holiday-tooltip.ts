import {Directive, ElementRef, HostListener, Input, ViewContainerRef} from '@angular/core';
import {TooltipService} from '../../tooltip/tooltip.service';
import {CalendarHoliday} from '../interfaces/calendar-holiday.interface';

@Directive({
  selector: '[tooltipHoliday]'
})
export class TlHolidayTooltipDirective {

  @Input() tooltipHoliday;

  @Input() tooltipDay: Array<CalendarHoliday>;

  constructor(private tooltipService: TooltipService,
              private view: ViewContainerRef,
              private element: ElementRef) {
  }

  @HostListener('mouseover')
  mouseHover() {
    if ( this.tooltipHoliday && this.tooltipDay.length > 0 ) {
      const day = this.tooltipDay[0];
      if ( day.tooltip ) {
        this.tooltipService.create(
          {text: day.description, placement: 'top-center'}, this.view, this.element.nativeElement);
      }
    }
  }

  @HostListener('mouseleave')
  mouseLeave() {
    if ( this.tooltipHoliday ) {
      this.tooltipService.destroy();
    }
  }

}
