import { Component, Input } from '@angular/core';
import { AccordionService } from '../../services/accordion.service';

@Component({
  selector: 'tl-accordion-item',
  templateUrl: './accordion-item.html',
  styleUrls: ['./accordion-item.scss'],
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
