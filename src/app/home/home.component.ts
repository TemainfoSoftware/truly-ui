import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GithubAPIService } from '../shared/services/githubapi';


@Component({
  selector: 'tl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public lastRelease;

  constructor( private githubService: GithubAPIService, private router: Router  ) {
    this.githubService.getReleases().subscribe( (releases => {
      this.lastRelease =  releases[ 0 ];
    }) );
  }

  onClickGetStarted() {
    this.router.navigate(['gettingstarted']);
  }
}
