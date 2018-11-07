import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ion-icon',
  templateUrl: './ion-icon.component.html',
  styleUrls: ['./ion-icon.component.scss']
})
export class IonIconComponent implements OnInit {

  public PREFIX_LIB = 'icon';

  @Input() icon: string;

  @Input() size: string;

  @Input() animation: string;

  @Input() platform: string;

  constructor() { }

  ngOnInit() {
  }

}
