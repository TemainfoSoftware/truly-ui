import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ion-icon',
  templateUrl: './ion-icon.component.html',
  styleUrls: ['./ion-icon.component.scss']
})
export class IonIconComponent implements OnInit {

  public PREFIX = 'ion';

  @Input() icon: string;

  @Input() style: string;

  @Input() size: string;

  @Input() animation: string;

  @Input() color: string;

  constructor() { }

  ngOnInit() {
    if ( this.style === undefined ) {
      this.style = 'md';
    }
  }

}
