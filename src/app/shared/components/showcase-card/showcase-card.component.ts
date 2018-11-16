import {
  Component,
  Input,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-showcase-card',
  templateUrl: './showcase-card.component.html',
  styleUrls: ['./showcase-card.component.scss'],
})
export class ShowcaseCardComponent implements AfterViewInit {

  @Input( 'icon' ) icon = '';

  @Input('title') title = 'New Card Header';

  constructor() { }

  ngAfterViewInit() { }

}
