import {
  Component,
  Input,
  OnChanges,
  OnInit
} from '@angular/core';

@Component({
  selector: 'ion-icon',
  templateUrl: './ion-icon.component.html',
  styleUrls: ['./ion-icon.component.scss']
})
export class IonIconComponent implements OnInit, OnChanges {

  @Input() icon: string;

  @Input() style: string;

  @Input() size = '12px';

  @Input() animation: string;

  @Input() color: string;

  @Input() align: string;

  public format: string;

  public PREFIX = 'ion ion';

  constructor() { }

  ngOnInit() {
    this.formatClass();
  }

  formatClass() {
    if ( this.style === undefined ) {
      this.style = 'md';
    }

    this.format = this.PREFIX + '-' + this.style + '-' + this.icon;
    this.format += (this.animation) ? ' anim-' + this.animation + ' animated' : '';
    this.format += (this.align) ? ' pull-' + this.align : '';
  }

  ngOnChanges() {
    this.formatClass();
  }

}
