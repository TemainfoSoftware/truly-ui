import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dx-icon',
  templateUrl: './dx-icon.component.html',
  styleUrls: ['./dx-icon.component.scss']
})
export class DxIconComponent implements OnInit {

  public PREFIX_LIB = 'dx-icon';

  @Input() icon: string;

  @Input() size: string;

  @Input() animation: string;

  constructor() { }

  ngOnInit() {
  }

}
