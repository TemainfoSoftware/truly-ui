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

  @ContentChildren( forwardRef( () => CardComponent ) ) cardComponent: QueryList<CardComponent>;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.renderer.setStyle(this.cardComponent.last.infoBox.nativeElement, 'margin-bottom', '20px');
  }

}
