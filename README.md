# README

 ![](.gitbook/assets/logo-readme%20%281%29.svg)  
 Truly-UI is a UI Framework for creating rich desktop applications  
  
 [![](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?branch=master)](http://commitizen.github.io/cz-cli/) [![](https://david-dm.org/TemainfoSoftware/truly-ui.svg)](https://david-dm.org/TemainfoSoftware/truly-ui/) [![](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)  
 [![](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/TemainfoSoftware/truly-ui/blob/master/LICENSE.md) [![](https://badges.greenkeeper.io/TemainfoSoftware/truly-ui.svg)](https://greenkeeper.io/) [![](https://api.codacy.com/project/badge/Grade/666b375858d540d08c7dccb9fe8e5a30)](https://www.codacy.com/app/mister-x59/truly-ui?utm_source=github.com&utm_medium=referral&utm_content=TemainfoSoftware/truly-ui&utm_campaign=badger) [![](https://travis-ci.org/TemainfoSoftware/truly-ui.svg?branch=master)](https://travis-ci.org/TemainfoSoftware/truly-ui)  


 [Quick Links](./#quick-links) • [Motivation](./#motivation) • [Prerequisites](./#prerequisites) • [Installation](./#installation) • [Usage](./#usage) • [Available Features](./#available-features) • [Feedback](./#feedback) • [License](./#license)

## Quick Links

* ✨ Learn about it on the [docs site](http://truly-ui.com/)
* 🚀 See it in action on [Stackblitz](https://stackblitz.com/edit/truly-ui-simple)
* 😎 Checkout the [sample application](integration.md)
* 📖 Read the blog [posts](https://medium.com/truly-ui)
* 📝 Learn about updates from the [changelog](https://github.com/TemainfoSoftware/truly-ui/releases)
* 💬 Get to know the latest news first through [slack](https://trulyui.slack.com)

## Motivation

TrulyUI is an Angular Framework especially developed for Desktop Applications based on Web Components using the greatest technologies of the world. TrulyUI is based on Angular, maintained by world-wide community. By the way, we believe that Angular is the most promising Web Framework. We developed TrulyUI thinking to fill a gap on open-source Web Technologies that's poor when it's about applications on Desktop. Ex: Electron, App.js and NW.js

## Prerequisites

We assume that you have already installed the following packages at least and are already running an AngularIO project.

* [NodeJS &gt;= 10.0.0](https://nodejs.org)
* [Angular Cli &gt;= 8.0.0](https://cli.angular.io/)
* [Angular &gt;= 8.0.0](https://angular.io/)

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

3. Configure styles of used font packages \(Icon Packages are already installed when running npm install truly-ui\):

   Inside the `angular.json` file add the following paths to the `styles` key

   ```text
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

   **Usage**

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

```markup
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

| Feature | Notes | Docs |
| :--- | :--- | :--- |
| accordion |  | [Docs](http://truly-ui.com/accordion) |
| autocomplete |  | [Docs](http://truly-ui.com/autocomplete) |
| avatar |  | [Docs](http://truly-ui.com/avatar) |
| badge |  | [Docs](http://truly-ui.com/badge) |
| blockui |  | [Docs](http://truly-ui.com/blockui) |
| button |  | [Docs](http://truly-ui.com/button) |
| buttongroup |  | [Docs](http://truly-ui.com/buttongroup) |
| calendar |  | [Docs](http://truly-ui.com/calendar) |
| chatlist |  | [Docs](http://truly-ui.com/chatlist) |
| checkbox |  | [Docs](http://truly-ui.com/checkbox) |
| colorpicker |  | [Docs](http://truly-ui.com/colorpicker) |
| contextmenu |  | [Docs](http://truly-ui.com/contextmenu) |
| datatable |  | [Docs](http://truly-ui.com/datatable) |
| datepicker |  | [Docs](http://truly-ui.com/datepicker) |
| dialog |  | [Docs](http://truly-ui.com/dialog) |
| dropdownlist |  | [Docs](http://truly-ui.com/dropdownlist) |
| editor |  | [Docs](http://truly-ui.com/editor) |
| form |  | [Docs](http://truly-ui.com/form) |
| icon |  | [Docs](http://truly-ui.com/icon) |
| input |  | [Docs](http://truly-ui.com/input) |
| listbox |  | [Docs](http://truly-ui.com/listbox) |
| menu |  | [Docs](http://truly-ui.com/menu) |
| shortcut |  | [Docs](http://truly-ui.com/misc) |
| modal |  | [Docs](http://truly-ui.com/modal) |
| multiselect |  | [Docs](http://truly-ui.com/multiselect) |
| multiview |  | [Docs](http://truly-ui.com/multiview) |
| navigator |  | [Docs](http://truly-ui.com/navigator) |
| overlaypanel |  | [Docs](http://truly-ui.com/overlaypanel) |
| panelgroup |  | [Docs](http://truly-ui.com/panelgroup) |
| popupmenu |  | [Docs](http://truly-ui.com/popupmenu) |
| progressbar |  | [Docs](http://truly-ui.com/progressbar) |
| radiobutton |  | [Docs](http://truly-ui.com/radiobutton) |
| sidebar |  | [Docs](http://truly-ui.com/sidebar) |
| splitbutton |  | [Docs](http://truly-ui.com/splitbutton) |
| stopwatch |  | [Docs](http://truly-ui.com/stopwatch) |
| switch |  | [Docs](http://truly-ui.com/switch) |
| tabcontrol |  | [Docs](http://truly-ui.com/tabcontrol) |
| textarea |  | [Docs](http://truly-ui.com/tabcontrol) |
| theming |  | [Docs](http://truly-ui.com/theming) |
| timeavaliable |  | [Docs](http://truly-ui.com/timeavaliable) |
| timeline |  | [Docs](http://truly-ui.com/timeline) |
| timepicker |  | [Docs](http://truly-ui.com/timepicker) |
| toaster |  | [Docs](http://truly-ui.com/toaster) |
| toolbar |  | [Docs](http://truly-ui.com/toolbar) |
| tooltip |  | [Docs](http://truly-ui.com/tooltip) |
| validators |  | [Docs](http://truly-ui.com/validators) |

### In progress, planned, and non-planned features

| Feature | Status | Docs | Issue |
| :--- | :--- | :--- | :--- |
| datetimepicker | non-planned |  |  |
| clockpicker | In-progress, planned S1 2019 |  |  |
| monthyearpicker | non-planned |  |  |
| paginator | In-progress, planned S1 2019 |  |  |
| schedule | In-progress, planned S1 2019 |  |  |
| widget | non-planned |  |  |

## Feedback

Feedback is always welcome.

## For google

angular ui components angular 2 components, angular 4 components, angular electron, angular 5 components ng2 nw ng components ng-components ng2-components angular2 components angular4 electron angular 5 components angular 6 components angular 7 components angular electron components desktop applications library ui components desktop electron angular components electron angular

## License

The MIT License \(MIT\)

Copyright \(c\) 2019 [Temainfo Software](mailto:suporte@temainfo.com.br)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files \(the "Software"\), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

