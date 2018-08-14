import {
  Component, OnInit, Input, ContentChildren, forwardRef, QueryList, AfterViewInit,
  Renderer2
} from '@angular/core';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-showcase-card',
  templateUrl: './showcase-card.component.html',
  styleUrls: ['./showcase-card.component.scss'],
})
export class ShowcaseCardComponent implements AfterViewInit {

  @Input( 'icon' ) icon = '';

  @Input('title') title = 'New Card Header';

  constructor() { }

  ngAfterViewInit() {
  }

}
