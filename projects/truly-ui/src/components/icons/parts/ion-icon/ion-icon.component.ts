import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ion-icon',
  templateUrl: './ion-icon.component.html',
  styleUrls: ['./ion-icon.component.scss']
})
export class IonIconComponent implements OnInit {

  public format: string;

  public PREFIX = 'ion ion';

  @Input() icon: string;

  @Input() style: string;

  @Input() size: string;

  @Input() animation: string;

  @Input() color: string;

  @Input() align: string;

  constructor() { }

  ngOnInit() {
    if ( this.style === undefined ) {
      this.style = 'md';
    }

    this.format = this.PREFIX + '-' + this.style + '-' + this.icon;
    this.format += (this.animation) ? ' anim-' + this.animation + ' animated' : '';
    this.format += (this.align) ? ' pull-' + this.align : '';
  }

}
