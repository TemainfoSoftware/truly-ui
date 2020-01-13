import {
  Component,
  Input,
  OnChanges,
  OnInit
} from '@angular/core';

@Component({
  selector: 'tl-dx-icon',
  templateUrl: './tl-dx-icon.component.html',
  styleUrls: ['./tl-dx-icon.component.scss']
})
export class TlDxIconComponent implements OnInit, OnChanges {

  @Input() icon: string;

  @Input() size = '12px';

  @Input() animation: string;

  @Input() color: string;

  @Input() align: string;

  public format: string;

  public PREFIX = 'dx-icon dx-icon-';

  constructor() { }

  ngOnInit() {
    this.formatClass();
  }

  formatClass() {
    this.format = this.PREFIX + this.icon;
    this.format += (this.animation) ? ' anim-' + this.animation + ' animated' : '';
    this.format += (this.align) ? ' pull-' + this.align : '';
  }

  ngOnChanges() {
    this.formatClass();
  }

}
