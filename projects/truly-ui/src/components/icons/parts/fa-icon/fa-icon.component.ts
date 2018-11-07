import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fa-icon',
  templateUrl: './fa-icon.component.html',
  styleUrls: ['./fa-icon.component.scss']
})
export class FaIconComponent implements OnInit {

  public PREFIX_LIB = 'fas';

  @Input() icon: string;

  @Input() size: string;

  @Input() animation: string;

  constructor() { }

  ngOnInit() {
  }

}
