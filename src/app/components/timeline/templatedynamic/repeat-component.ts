import {Component, Input} from '@angular/core';

@Component({
  selector: 'repeat-component',
  template: `
    <div *ngFor="let item of data">
      <div class="content-subtitle">{{ item.title }}</div>
      <div class="content-text">
        <p>{{ item.text }}</p>
      </div>
    </div>
  `,
  styles: [`
    .content-subtitle {
      border-top: 1px solid #DDDDDD;
      border-bottom: 1px solid #DDDDDD;
      background: #f2f2f2;
      padding: 5px 10px;
      font-size: 14px;
    }

    .content-text {
      padding: 5px 10px;
      font-size: 12px;
    }
  `]
})
export class RepeatComponent {

  @Input( 'data' ) data = [];

}
