# Truly-UI  


[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/TemainfoSoftware/truly-ui/blob/master/LICENSE.md)
[![Greenkeeper badge](https://badges.greenkeeper.io/TemainfoSoftware/truly-ui.svg)](https://greenkeeper.io/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/666b375858d540d08c7dccb9fe8e5a30)](https://www.codacy.com/app/mister-x59/truly-ui?utm_source=github.com&utm_medium=referral&utm_content=TemainfoSoftware/truly-ui&utm_campaign=badger)
[![Build Status](https://travis-ci.org/TemainfoSoftware/truly-ui.svg?branch=master)](https://travis-ci.org/TemainfoSoftware/truly-ui) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Dependency Status](https://david-dm.org/TemainfoSoftware/truly-ui.svg)](https://david-dm.org/TemainfoSoftware/truly-ui) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

**Web Components for Desktop Applications.**

-------

<p align="center">
    <a href="#motivation">Motivation</a> &bull;
    <a href="#prerequisites">Prerequisites</a> &bull;
    <a href="#installation">Installation</a> &bull;
    <a href="#usage">Usage</a> &bull;
    <a href="#available-features">Available Features</a> &bull;
    <a href="#feedback">Feedback</a> &bull;
    <a href="#license">License</a>
</p>

-------

<p align="center">
  <img style="
  @font-face {
      font-family: Open Sans;
      src: url(scr/assets/fonts/opensans.TTF);
  }
  font-family: 'Open Sans'
  " src="src/assets/img/logo-readme.svg" width="500">
</p>


## Motivation
TrulyUI is an Angular Framework especially developed for Desktop Applications based on Web Components using the greatest technologies of the world. TrulyUI is based on Angular, maintained by world-wide community. By the way, we believe that Angular is the most promising Web Framework. We developed TrulyUI thinking to fill a gap on open-source Web Technologies that's poor when it's about applications on Desktop.
Ex: Electron, App.js and NW.js

## Prerequisites

We assume that you have already installed the following packages at least and are already running an AngularIO project.

* [NodeJS >= 8.0.0](https://nodejs.org)
* [Angular Cli >= 6.0.0](https://cli.angular.io/)
* [Angular >= 6.0.0](https://angular.io/)

## Installation

1. Having NPM installation run the following command on your terminal to install it:

    ```bash
    $ npm install truly-ui --save
    ```
    
2. Configure styles of used font packages (Icon Packages are already installed when running npm install truly-ui):
    
    Inside the `angular.json` file add the following paths to the `styles` key

    ```
    "styles": [
          "node_modules/@angular/cdk/overlay-prebuilt.css",
          "node_modules/truly-ui/css/icons/dx-icons/css/icons.scss",
          "node_modules/truly-ui/css/icons/fa-icons/css/icons.scss",
          "node_modules/truly-ui/css/icons/ion-icons/css/icons.scss",
          "node_modules/truly-ui/css/icons/animations.scss"
    ]
    ```
    
3. Configure CoreModule on your AppModule:

   ```typescript
   import { BrowserModule } from '@angular/platform-browser';
   import { FormsModule } from '@angular/forms';
   import { NgModule } from '@angular/core';
   
   import { AppComponent } from './app.component';
   
   import { CoreModule } from 'truly-ui'; //CoreModule
    
   @NgModule({
     declarations: [
       AppComponent
     ],
     imports: [
       BrowserModule,
       CoreModule.forRoot({theme: 'default'}) // Configurations
     ],
     providers: [],
     bootstrap: [AppComponent]
   })
   export class AppModule { }
   ```  
## Usage
The use of the components is basically the importation of the main module and the use of the directives in its application: Example is the import of the input module and its use

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library, for example the InputComponent :
import { InputModule, ButtonModule } from 'truly-ui';//Import Modules

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Specify your library as an import
    InputModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->

 <tl-input
     [(ngModel)]="Many Properties"
     [iconBefore]="'ion-printer'"
     [placeholder]="'With Placeholder'"
     [textAfter]="'US'"
     [clearButton]="true"
     [autocomplete]="'off'">
 </tl-input>
```

## Available Features

| Feature          | Notes                                                  | Docs         |
|------------------|--------------------------------------------------------|--------------|
| accordion        |                                                        |   [Docs][1]  |
| autocomplete     |                                                        |   [Docs][2]  |
| badge            |                                                        |   [Docs][3]  |
| blockui          |                                                        |   [Docs][4]  |
| button           |                                                        |   [Docs][5]  |
| buttongroup      |                                                        |   [Docs][6]  |
| calendar         |                                                        |   [Docs][7]  |
| chatlist         |                                                        |   [Docs][8]  |
| checkbox         |                                                        |   [Docs][9]  |
| colorpicker      |                                                        |   [Docs][10] |
| contextmenu      |                                                        |   [Docs][11] |
| datatable        |                                                        |   [Docs][12] |
| datepicker       |                                                        |   [Docs][13] |
| dialog           |                                                        |   [Docs][14] |
| dropdownlist     |                                                        |   [Docs][15] |
| editor           |                                                        |   [Docs][16] |
| form             |                                                        |   [Docs][17] |
| icon             |                                                        |   [Docs][18] |
| input            |                                                        |   [Docs][19] |
| listbox          |                                                        |   [Docs][20] |
| menu             |                                                        |   [Docs][21] |
| shortcut         |                                                        |   [Docs][22] |
| modal            |                                                        |   [Docs][23] |
| multiselect      |                                                        |   [Docs][24] |
| multiview        |                                                        |   [Docs][25] |
| navigator        |                                                        |   [Docs][26] |
| overlaypanel     |                                                        |   [Docs][27] |
| panelgroup       |                                                        |   [Docs][28] |
| popupmenu        |                                                        |   [Docs][29] |
| progressbar      |                                                        |   [Docs][30] |
| radiobutton      |                                                        |   [Docs][31] |
| sidebar          |                                                        |   [Docs][32] |
| splitbutton      |                                                        |   [Docs][33] |
| stopwatch        |                                                        |   [Docs][34] |
| switch           |                                                        |   [Docs][35] |
| tabcontrol       |                                                        |   [Docs][36] |
| theming          |                                                        |   [Docs][37] |
| timeline         |                                                        |   [Docs][38] |
| toaster          |                                                        |   [Docs][39] |
| toolbar          |                                                        |   [Docs][40] |
| tooltip          |                                                        |   [Docs][41] |
| validators       |                                                        |   [Docs][42] |


#### In progress, planned, and non-planned features

| Feature          | Status                              | Docs         | Issue          |
|------------------|-------------------------------------|--------------|----------------|
| datetimepicker   |                         non-planned |              |                |
| timepicker       |        In-progress, planned S2 2018 |              |                |
| clockpicker      |        In-progress, planned S2 2018 |              |                |
| monthyearpicker  |                         non-planned |              |                |
| paginator        |        In-progress, planned S1 2019 |              |                |
| schedule         |        In-progress, planned S1 2019 |              |                |
| widget           |                         non-planned |              |                |

 [1]: http://truly-ui.com/accordion
 [2]: http://truly-ui.com/autocomplete
 [3]: http://truly-ui.com/badge
 [4]: http://truly-ui.com/blockui
 [5]: http://truly-ui.com/button
 [6]: http://truly-ui.com/buttongroup
 [7]: http://truly-ui.com/calendar
 [8]: http://truly-ui.com/chatlist
 [9]: http://truly-ui.com/checkbox
[10]: http://truly-ui.com/colorpicker
[11]: http://truly-ui.com/contextmenu
[12]: http://truly-ui.com/datatable
[13]: http://truly-ui.com/datepicker
[14]: http://truly-ui.com/dialog
[15]: http://truly-ui.com/dropdownlist
[16]: http://truly-ui.com/editor
[17]: http://truly-ui.com/form
[18]: http://truly-ui.com/icon
[19]: http://truly-ui.com/input
[20]: http://truly-ui.com/listbox
[21]: http://truly-ui.com/menu
[22]: http://truly-ui.com/misc
[23]: http://truly-ui.com/modal
[24]: http://truly-ui.com/multiselect
[25]: http://truly-ui.com/multiview
[26]: http://truly-ui.com/navigator
[27]: http://truly-ui.com/overlaypanel
[28]: http://truly-ui.com/panelgroup
[29]: http://truly-ui.com/popupmenu
[30]: http://truly-ui.com/progressbar
[31]: http://truly-ui.com/radiobutton
[32]: http://truly-ui.com/sidebar
[33]: http://truly-ui.com/splitbutton
[34]: http://truly-ui.com/stopwatch
[35]: http://truly-ui.com/switch
[36]: http://truly-ui.com/tabcontrol
[37]: http://truly-ui.com/theming
[38]: http://truly-ui.com/timeline
[39]: http://truly-ui.com/toaster
[40]: http://truly-ui.com/toolbar
[41]: http://truly-ui.com/tooltip
[42]: http://truly-ui.com/validators

## Feedback
Feedback is always welcome.

## For google
angular 2 components, angular 4 components, angular electron, angular 5 components ng2 nw ng components
ng-components ng2-components angular2 components angular4 electron angular 5 components angular 6 components 
angular 7 components angular electron components desktop applications library ui components desktop electron angular
components electron angular


## License

The MIT License (MIT)

Copyright (c) 2018 [Temainfo Software](mailto:suporte@temainfo.com.br)

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
