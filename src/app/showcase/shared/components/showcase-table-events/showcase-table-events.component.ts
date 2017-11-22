import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-showcase-table-events',
  templateUrl: './showcase-table-events.component.html',
  styleUrls: ['./showcase-table-events.component.scss'],
})
export class ShowcaseTableEventsComponent implements OnInit {

  @Input('data') data = [];

  constructor() { }

  ngOnInit() {
  }

}
