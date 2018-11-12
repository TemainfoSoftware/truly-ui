import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fa-icon',
  templateUrl: './fa-icon.component.html',
  styleUrls: ['./fa-icon.component.scss']
})
export class FaIconComponent implements OnInit {

  public PREFIX = 'fa-';

  @Input() icon: string;

  @Input() style: string;

  @Input() size: string;

  @Input() animation: string;

  @Input() color: string;

  constructor() { }

  ngOnInit() {
    if ( this.style === undefined ) {
      this.style = 'fas';
    }
  }

}
