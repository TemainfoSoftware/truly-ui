import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-showcase-card',
  templateUrl: './showcase-card.component.html',
  styleUrls: ['./showcase-card.component.scss'],
})
export class ShowcaseCardComponent implements OnInit {

  @Input('title') title = 'New Card Header';

  constructor() { }

  ngOnInit() {
  }

}
