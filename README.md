<p align="center">
  <img style="
  @font-face {
      font-family: Open Sans;
      src: url(scr/assets/fonts/opensans.TTF);
  }
  font-family: 'Open Sans'
  " src="src/assets/img/logo-readme.svg" width="500">
  <br />
  Truly-UI is a UI Framework for creating rich desktop applications
  <br /><br />
    <a href="http://commitizen.github.io/cz-cli/">
      <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?branch=master" />
    </a>
    <a href="https://david-dm.org/TemainfoSoftware/truly-ui/">
      <img src="https://david-dm.org/TemainfoSoftware/truly-ui.svg" />
    </a>
    <a href="https://github.com/semantic-release/semantic-release">
      <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" />
    </a> 
    <br />
    <a href="https://github.com/TemainfoSoftware/truly-ui/blob/master/LICENSE.md">
      <img src="https://img.shields.io/badge/license-MIT-green.svg" />
    </a>
    <a href="https://greenkeeper.io/">
      <img src="https://badges.greenkeeper.io/TemainfoSoftware/truly-ui.svg" />
    </a>
    <a href="https://www.codacy.com/app/mister-x59/truly-ui?utm_source=github.com&utm_medium=referral&utm_content=TemainfoSoftware/truly-ui&utm_campaign=badger">
      <img src="https://api.codacy.com/project/badge/Grade/666b375858d540d08c7dccb9fe8e5a30" />
    </a> 
    <a href="https://travis-ci.org/TemainfoSoftware/truly-ui">
      <img src="https://travis-ci.org/TemainfoSoftware/truly-ui.svg?branch=master" />
    </a>
  <br/>
</p>

-------

<p align="center">
    <a href="#quick-links">Quick Links</a> &bull;
    <a href="#motivation">Motivation</a> &bull;
    <a href="#prerequisites">Prerequisites</a> &bull;
    <a href="#installation">Installation</a> &bull;
    <a href="#usage">Usage</a> &bull;
    <a href="#available-features">Available Features</a> &bull;
    <a href="#feedback">Feedback</a> &bull;
    <a href="#license">License</a>
</p>

-------
  <br/>

## Quick Links

- ✨ Learn about it on the [docs site](http://truly-ui.com/)
- 🚀 See it in action on [Stackblitz](https://stackblitz.com/edit/truly-ui-simple)
- 😎 Checkout the [sample application](integration)
- 📖 Read the blog [posts](https://medium.com/truly-ui)
- 📝 Learn about updates from the [changelog](https://github.com/TemainfoSoftware/truly-ui/releases)
- 💬 Get to know the latest news first through [slack](https://trulyui.slack.com)



## Motivation
TrulyUI is an Angular Framework especially developed for Desktop Applications based on Web Components using the greatest technologies of the world. TrulyUI is based on Angular, maintained by world-wide community. By the way, we believe that Angular is the most promising Web Framework. We developed TrulyUI thinking to fill a gap on open-source Web Technologies that's poor when it's about applications on Desktop.
Ex: Electron, App.js and NW.js

## Prerequisites

We assume that you have already installed the following packages at least and are already running an AngularIO project.

* [NodeJS >= 10.0.0](https://nodejs.org)
* [Angular Cli >= 8.0.0](https://cli.angular.io/)
* [Angular >= 8.0.0](https://angular.io/)

## Installation

1. Having NPM installation run the following command on your terminal to install it:

    ```bash
    $ npm install --save truly-ui @angular/animations @angular/cdk 
    ```
    
2. Because NPM does not install `peerDependencies`, you should manually install the dependencies:
    
    ```bash
    $ npm install --save string-format ts-md5 object-path reflect-metadata
    $ npm install --save-dev @types/object-path 
    ```
    
3. Configure styles of used font packages (Icon Packages are already installed when running npm install truly-ui):
    
    Inside the `angular.json` file add the following paths to the `styles` key

    ```
    "styles": [
          "src/styles.css",
          ...
          "node_modules/@angular/cdk/overlay-prebuilt.css",
          "node_modules/truly-ui/css/icons/dx-icons/css/icons.scss",
          "node_modules/truly-ui/css/icons/fa-icons/css/icons.scss",
          "node_modules/truly-ui/css/icons/ion-icons/css/icons.scss",
          "node_modules/truly-ui/css/icons/animations.scss"
    ]
    ```
    
4. Configure CoreModule on your AppModule:

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
import { InputModule, ButtonModule, CoreModule } from 'truly-ui';//Import Modules

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot({theme: 'default'}),
    
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
| avatar           |                                                        |   [Docs][3]  |
| badge            |                                                        |   [Docs][4]  |
| blockui          |                                                        |   [Docs][5]  |
| button           |                                                        |   [Docs][6]  |
| buttongroup      |                                                        |   [Docs][7]  |
| calendar         |                                                        |   [Docs][8]  |
| chatlist         |                                                        |   [Docs][9]  |
| checkbox         |                                                        |   [Docs][10]  |
| colorpicker      |                                                        |   [Docs][11] |
| contextmenu      |                                                        |   [Docs][12] |
| datatable        |                                                        |   [Docs][13] |
| datepicker       |                                                        |   [Docs][14] |
| dialog           |                                                        |   [Docs][15] |
| dropdownlist     |                                                        |   [Docs][16] |
| editor           |                                                        |   [Docs][17] |
| form             |                                                        |   [Docs][18] |
| icon             |                                                        |   [Docs][19] |
| input            |                                                        |   [Docs][20] |
| listbox          |                                                        |   [Docs][21] |
| menu             |                                                        |   [Docs][22] |
| shortcut         |                                                        |   [Docs][23] |
| modal            |                                                        |   [Docs][24] |
| multiselect      |                                                        |   [Docs][25] |
| multiview        |                                                        |   [Docs][26] |
| navigator        |                                                        |   [Docs][27] |
| overlaypanel     |                                                        |   [Docs][28] |
| panelgroup       |                                                        |   [Docs][29] |
| popupmenu        |                                                        |   [Docs][30] |
| progressbar      |                                                        |   [Docs][31] |
| radiobutton      |                                                        |   [Docs][32] |
| sidebar          |                                                        |   [Docs][33] |
| splitbutton      |                                                        |   [Docs][34] |
| stopwatch        |                                                        |   [Docs][35] |
| switch           |                                                        |   [Docs][36] |
| tabcontrol       |                                                        |   [Docs][37] |
| textarea         |                                                        |   [Docs][38] |
| theming          |                                                        |   [Docs][39] |
| timeavaliable    |                                                        |   [Docs][40] |
| timeline         |                                                        |   [Docs][41] |
| timepicker       |                                                        |   [Docs][42] |
| toaster          |                                                        |   [Docs][43] |
| toolbar          |                                                        |   [Docs][44] |
| tooltip          |                                                        |   [Docs][45] |
| validators       |                                                        |   [Docs][46] |


#### In progress, planned, and non-planned features

| Feature          | Status                              | Docs         | Issue          |
|------------------|-------------------------------------|--------------|----------------|
| datetimepicker   |                         non-planned |              |                |
| clockpicker      |        In-progress, planned S1 2019 |              |                |
| monthyearpicker  |                         non-planned |              |                |
| paginator        |        In-progress, planned S1 2019 |              |                |
| schedule         |        In-progress, planned S1 2019 |              |                |
| widget           |                         non-planned |              |                |

 [1]: http://truly-ui.com/accordion
 [2]: http://truly-ui.com/autocomplete
 [3]: http://truly-ui.com/avatar
 [4]: http://truly-ui.com/badge
 [5]: http://truly-ui.com/blockui
 [6]: http://truly-ui.com/button
 [7]: http://truly-ui.com/buttongroup
 [8]: http://truly-ui.com/calendar
 [9]: http://truly-ui.com/chatlist
 [10]: http://truly-ui.com/checkbox
[11]: http://truly-ui.com/colorpicker
[12]: http://truly-ui.com/contextmenu
[13]: http://truly-ui.com/datatable
[14]: http://truly-ui.com/datepicker
[15]: http://truly-ui.com/dialog
[16]: http://truly-ui.com/dropdownlist
[17]: http://truly-ui.com/editor
[18]: http://truly-ui.com/form
[19]: http://truly-ui.com/icon
[20]: http://truly-ui.com/input
[21]: http://truly-ui.com/listbox
[22]: http://truly-ui.com/menu
[23]: http://truly-ui.com/misc
[24]: http://truly-ui.com/modal
[25]: http://truly-ui.com/multiselect
[26]: http://truly-ui.com/multiview
[27]: http://truly-ui.com/navigator
[28]: http://truly-ui.com/overlaypanel
[29]: http://truly-ui.com/panelgroup
[30]: http://truly-ui.com/popupmenu
[31]: http://truly-ui.com/progressbar
[32]: http://truly-ui.com/radiobutton
[33]: http://truly-ui.com/sidebar
[34]: http://truly-ui.com/splitbutton
[35]: http://truly-ui.com/stopwatch
[36]: http://truly-ui.com/switch
[37]: http://truly-ui.com/tabcontrol
[38]: http://truly-ui.com/tabcontrol
[39]: http://truly-ui.com/theming
[40]: http://truly-ui.com/timeavaliable
[41]: http://truly-ui.com/timeline
[42]: http://truly-ui.com/timepicker
[43]: http://truly-ui.com/toaster
[44]: http://truly-ui.com/toolbar
[45]: http://truly-ui.com/tooltip
[46]: http://truly-ui.com/validators

## Feedback
Feedback is always welcome.

## For google
angular ui components angular 2 components, angular 4 components, angular electron, angular 5 components ng2 nw ng components
ng-components ng2-components angular2 components angular4 electron angular 5 components angular 6 components 
angular 7 components angular electron components desktop applications library ui components desktop electron angular
components electron angular 


## License

The MIT License (MIT)

Copyright (c) 2019 [Temainfo Software](mailto:suporte@temainfo.com.br)

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
