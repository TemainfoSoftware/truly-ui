import { Component, Input } from '@angular/core';
import { AccordionService } from '../../services/accordion.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'tl-accordion-item',
  templateUrl: './accordion-item.html',
  styleUrls: ['./accordion-item.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('500ms', style({ opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('300ms', style({opacity: 0}))
        ])
      ]
    )
  ],
})
export class TlAccordionItem  {

  @Input() title = 'Title 1';

  @Input() heightHeader = '45px';

  @Input() opened = false;

  constructor(private accordionService: AccordionService) { }

  toggle() {
    this.accordionService.closeAll(this);
    this.opened = !this.opened;
  }

  close() {
    this.opened = false;
  }

}
