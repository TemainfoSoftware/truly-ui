import { Component } from '@angular/core';
import { GithubAPIService } from '../shared/services/githubapi';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private lastRelease;

  constructor( private githubService: GithubAPIService ) {
    this.githubService.getReleases().subscribe( (releases => {
      this.lastRelease = JSON.parse( releases[ '_body' ] )[ 0 ];
    }) );
  }
}
