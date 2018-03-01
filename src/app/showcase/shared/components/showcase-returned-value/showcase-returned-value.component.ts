import { Input, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-showcase-returned-value',
  templateUrl: './showcase-returned-value.component.html',
  styleUrls: ['./showcase-returned-value.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowcaseReturnedValueComponent implements OnInit {

  @Input() value = '';

  constructor() { }

  ngOnInit() {}

}
