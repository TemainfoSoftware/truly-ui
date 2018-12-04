import {
  Component,
  Input,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-showcase-header',
  templateUrl: './showcase-header.component.html',
  styleUrls: ['./showcase-header.component.scss'],
})
export class ShowcaseHeaderComponent implements AfterViewInit {

  @Input() name: string;

  @Input() module: string = null;

  constructor() { }

  ngAfterViewInit() { }

}
