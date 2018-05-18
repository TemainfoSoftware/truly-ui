import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { TlAccordionItem } from './parts/accordion-item/accordion-item';
import { AccordionService } from './services/accordion.service';

@Component({
  selector: 'tl-accordion',
  templateUrl: './accordion.html',
  styleUrls: ['./accordion.scss']
})
export class TlAccordion implements AfterContentInit {

  @Input() singleOpened = false;

  @ContentChildren( TlAccordionItem ) listAccordion: QueryList<TlAccordionItem>;

  constructor(private accordionService: AccordionService) { }

  ngAfterContentInit() {
    this.accordionService.setAccordionList(this.listAccordion.toArray(), this.singleOpened);
  }

}
