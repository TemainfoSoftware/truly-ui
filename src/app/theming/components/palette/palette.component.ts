import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss']
})
export class PaletteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'tag-color',
  template: `
    <div class="ui-color-tag {{font}}" [style.backgroundColor]="color">
      <div class="shade">{{shade}}</div>
      <div class="hex">{{color}}</div>
    </div>`,
  styles: [`
    .ui-color-tag {
      padding: 10px 15px 11px;
      font-weight: 500;
      border: 1px solid rgba(0, 0, 0, .12);
      border-bottom: none;
      font-size: 14px;
      display: flex;
    }

    .hex{
      flex-grow: 1;
      text-align: right;
    }

    .black{
       color: rgba(0,0,0,.87);
     }

    .white{
       color: rgba(255,255,255,.87);
     }
    `]
})
export class PaletteColorTagComponent {

  @Input() color: string;

  @Input() font = 'black';

  @Input() shade: string;

  constructor() { }
}
