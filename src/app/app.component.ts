import { Component, OnChanges } from '@angular/core';
import { CoreService } from '../../projects/truly-ui/src/components/core/services/core.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'tl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  inProduction = environment.production;

  colorSelected = 'default';

  data = [
    { textItem : 'Default', value : 'default' },
    { textItem : 'Red', value : 'red' },
    { textItem : 'Pink', value : 'pink' },
    { textItem : 'Purple', value : 'purple' },
    { textItem : 'Deep Purple', value : 'deeppurple' },
    { textItem : 'Indigo', value : 'indigo' },
    { textItem : 'Blue', value : 'blue' },
    { textItem : 'Light Blue', value : 'lightblue' },
    { textItem : 'Cyan', value : 'cyan' },
    { textItem : 'Teal ', value : 'teal' },
    { textItem : 'Green', value : 'green' },
    { textItem : 'Light Green', value : 'lightgreen' },
    { textItem : 'Lime', value : 'lime' },
    { textItem : 'Yellow', value : 'yellow' },
    { textItem : 'Amber', value : 'amber' },
    { textItem : 'Orange', value : 'orange' },
    { textItem : 'Deep Orange', value : 'deeporange' },
    { textItem : 'Brown', value : 'brown' },
    { textItem : 'Gray', value : 'gray' },
    { textItem : 'Blue Gray', value : 'bluegray' },
  ];

  constructor( private coreService: CoreService ) {}

  modelChange(themeName) {
    this.coreService.setTheme(themeName);
  }
}
