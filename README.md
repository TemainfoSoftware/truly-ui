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
  <img src="src/assets/images/logo.png" width="500">
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
           "../node_modules/font-awesome/css/font-awesome.min.css",
           "../node_modules/ionicons-npm/css/ionicons.min.css",
           "../node_modules/truly-ui/css/icons/dx-icons/dx-icons.scss",
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
| blockui          |                                                        |   [Docs][3]  |
| button           |                                                        |   [Docs][4]  |
| buttongroup      |                                                        |   [Docs][5]  |
| calendar         |                                                        |   [Docs][6]  |
| chatlist         |                                                        |   [Docs][7]  |
| checkbox         |                                                        |   [Docs][8]  |
| contextmenu      |                                                        |   [Docs][9]  |
| datatable        |                                                        |   [Docs][10] |
| datepicker       |                                                        |   [Docs][11] |
| dialog           |                                                        |   [Docs][12] |
| dropdownlist     |                                                        |   [Docs][13] |
| editor           |                                                        |   [Docs][14] |
| form             |                                                        |   [Docs][15] |
| input            |                                                        |   [Docs][16] |
| listbox          |                                                        |   [Docs][17] |
| menu             |                                                        |   [Docs][18] |
| shortcut         |                                                        |   [Docs][19] |
| modal            |                                                        |   [Docs][20] |
| multiselect      |                                                        |   [Docs][21] |
| multiview        |                                                        |   [Docs][22] |
| navigator        |                                                        |   [Docs][23] |
| overlaypanel     |                                                        |   [Docs][24] |
| panelgroup       |                                                        |   [Docs][25] |
| popupmenu        |                                                        |   [Docs][26] |
| progressbar      |                                                        |   [Docs][27] |
| radiobutton      |                                                        |   [Docs][28] |
| sidebar          |                                                        |   [Docs][29] |
| splitbutton      |                                                        |   [Docs][30] |
| switch           |                                                        |   [Docs][31] |
| tabcontrol       |                                                        |   [Docs][32] |
| toaster          |                                                        |   [Docs][33] |
| toolbar          |                                                        |   [Docs][34] |
| tooltip          |                                                        |   [Docs][35] |
| validators       |                                                        |   [Docs][36] |


#### In progress, planned, and non-planned features

| Feature          | Status                              | Docs         | Issue          |
|------------------|-------------------------------------|--------------|----------------|
| colorpicker      |                         non-planned |              |                |
| datetimepicker   |                         non-planned |              |                |
| hourpicker       |                         non-planned |              |                |
| icon             |        In-progress, planned S2 2018 |              |                |
| monthyearpicker  |                         non-planned |              |                |
| paginator        |        In-progress, planned S2 2018 |              |                |
| schedule         |        In-progress, planned S2 2018 |              |                |
| theming          |        In-progress, planned S2 2018 |              |                |
| timeline         |                         non-planned |              |                |
| widget           |                         non-planned |              |                |

 [1]: http://truly-ui.tk/accordion
 [2]: http://truly-ui.tk/autocomplete
 [3]: http://truly-ui.tk/blockui
 [4]: http://truly-ui.tk/button
 [5]: http://truly-ui.tk/buttongroup
 [6]: http://truly-ui.tk/calendar
 [7]: http://truly-ui.tk/chatlist
 [8]: http://truly-ui.tk/checkbox
 [9]: http://truly-ui.tk/contextmenu
[10]: http://truly-ui.tk/datatable
[11]: http://truly-ui.tk/datepicker
[12]: http://truly-ui.tk/dialog
[13]: http://truly-ui.tk/dropdownlist
[14]: http://truly-ui.tk/editor
[15]: http://truly-ui.tk/form
[16]: http://truly-ui.tk/input
[17]: http://truly-ui.tk/listbox
[18]: http://truly-ui.tk/menu
[19]: http://truly-ui.tk/misc
[20]: http://truly-ui.tk/modal
[21]: http://truly-ui.tk/multiselect
[22]: http://truly-ui.tk/multiview
[23]: http://truly-ui.tk/navigator
[24]: http://truly-ui.tk/overlaypanel
[25]: http://truly-ui.tk/panelgroup
[26]: http://truly-ui.tk/popupmenu
[27]: http://truly-ui.tk/progressbar
[28]: http://truly-ui.tk/radiobutton
[29]: http://truly-ui.tk/sidebar
[30]: http://truly-ui.tk/splitbutton
[31]: http://truly-ui.tk/switch
[32]: http://truly-ui.tk/tabcontrol
[33]: http://truly-ui.tk/toaster
[34]: http://truly-ui.tk/toolbar
[35]: http://truly-ui.tk/tooltip
[36]: http://truly-ui.tk/validators

## Feedback
Feedback is always welcome.


## License

The MIT License (MIT)

Copyright (c) 2018 [Temainfo Software](mailto:suporte@temainfo.com.br)

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
