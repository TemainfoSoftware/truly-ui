import { Component } from '@angular/core';
import { GithubAPIService } from '../shared/services/githubapi';


@Component({
  selector: 'tl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public lastRelease;

  constructor( private githubService: GithubAPIService ) {
    this.githubService.getReleases().subscribe( (releases => {
      this.lastRelease =  releases[ 0 ];
    }) );
  }
}
