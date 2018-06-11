import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from '../../projects/truly-ui/src/components/core/';
import { ContainerModalModule } from '../../projects/truly-ui/src/components/modal/addons/container-modal';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { GettingStartedModule } from './getting-started/getting-started.module';
import { GithubAPIService } from './shared/services/githubapi';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule.forRoot({
      theme: 'default'
    }),
    ContainerModalModule,
    GettingStartedModule,
    HomeModule,
    HttpClientModule
  ],
  providers: [GithubAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
