import { Component, ElementRef, Input,
  ViewChild
} from '@angular/core';
import { AccordionService } from '../../services/accordion.service';

@Component({
  selector: 'tl-accordion-item',
  templateUrl: './accordion-item.html',
  styleUrls: ['./accordion-item.scss'],
})
export class TlAccordionItem {

  @Input() title = 'Title 1';

  @Input() heightHeader = '45px';

  @Input() disabled = false;

  @Input() opened = false;

  @ViewChild( 'panel', {static: true} ) panel: ElementRef;

  public maxHeight;

  constructor( private accordionService: AccordionService ) { }

  toggle() {
    if (this.disabled) {
      return;
    }
    this.accordionService.closeAll(this);
    this.opened = !this.opened;
  }

  getColor() {
    return this.accordionService.getColor();
  }

  close() {
    this.opened = false;
  }

}
