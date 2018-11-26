import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ButtonModule } from '../../projects/truly-ui/src/components/button';
import { IconsModule } from '../../projects/truly-ui/src/components/icons';
import { CoreModule } from '../../projects/truly-ui/src/components/core/index';
import { DropDownListModule } from '../../projects/truly-ui/src/components/dropdownlist';
import { en_US } from '../../projects/truly-ui/src/components/i18n';
import { ContainerModalModule } from '../../projects/truly-ui/src/components/modal/addons/container-modal';
import { ToolbarModule } from '../../projects/truly-ui/src/components/toolbar';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { GettingStartedModule } from './getting-started/getting-started.module';
import { GithubAPIService } from './shared/services/githubapi';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ToasterModule } from '../../projects/truly-ui/src/components/toaster/index';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    CoreModule.forRoot({
      theme: 'default',
      language: en_US
    }),
    DropDownListModule,
    ContainerModalModule,
    GettingStartedModule,
    ToolbarModule,
    ButtonModule,
    HomeModule,
    IconsModule,
    ToasterModule.forRoot(),
    HttpClientModule,
    ServiceWorkerModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [GithubAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
