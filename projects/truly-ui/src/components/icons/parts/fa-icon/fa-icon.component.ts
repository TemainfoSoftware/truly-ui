import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fa-icon',
  templateUrl: './fa-icon.component.html',
  styleUrls: ['./fa-icon.component.scss']
})
export class FaIconComponent implements OnInit {

  public format: string;

  public PREFIX = 'fa-';

  @Input() icon: string;

  @Input() style: string;

  @Input() size: string;

  @Input() animation: string;

  @Input() color: string;

  @Input() align: string;

  constructor() { }

  ngOnInit() {
    if ( this.style === undefined ) {
      this.style = 'fas';
    }

    this.format = this.style + ' ';
    this.format += this.PREFIX + this.icon;
    this.format += (this.animation) ? ' anim-' + this.animation + ' animated' : '';
    this.format += (this.align) ? ' pull-' + this.align : '';
  }

}
