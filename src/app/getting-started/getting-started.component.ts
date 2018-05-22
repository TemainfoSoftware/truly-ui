import { AfterViewInit, Component, OnInit } from '@angular/core';


@Component({
  selector: 'tl-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss']
})
export class GettingStartedComponent implements OnInit, AfterViewInit {
  title = 'app works!';

  ngOnInit() {
  }


  ngAfterViewInit() {
  }
}
