import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AutocompleteModule } from '../../../src/autocomplete';
import { MultiselectModule } from '../../../src/multiselect';
import { InputModule } from '../../../src/input';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AutocompleteModule,
    MultiselectModule,
    InputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
