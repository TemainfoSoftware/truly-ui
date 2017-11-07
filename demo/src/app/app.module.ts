import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GettingStartedModule } from './getting-started/getting-started.module';
import { GithubAPIService } from "./shared/services/githubapi";
import { DirectiveModule } from "../../../src/core/directives/index";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    DirectiveModule,
    FormsModule,
    HttpModule,
    GettingStartedModule,
    HomeModule,
  ],
  exports: [],
  providers: [GithubAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
