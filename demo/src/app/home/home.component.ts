import { AfterViewInit, Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  title = 'app works!';

  ngOnInit() {
  }


  ngAfterViewInit() {
  }
}
