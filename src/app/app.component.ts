import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'tl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  inProduction = environment.production;
}
