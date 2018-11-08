import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fa-icon',
  templateUrl: './fa-icon.component.html',
  styleUrls: ['./fa-icon.component.scss']
})
export class FaIconComponent implements OnInit {

  public PREFIX_LIB_SOLID = 'fas';

  public PREFIX_LIB_REGULAR = 'far';

  @Input() icon: string;

  @Input() size: string;

  @Input() animation: string;

  @Input() style: string;

  constructor() { }

  ngOnInit() {
  }

}
