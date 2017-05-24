# Truly-UI  
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/666b375858d540d08c7dccb9fe8e5a30)](https://www.codacy.com/app/mister-x59/truly-ui?utm_source=github.com&utm_medium=referral&utm_content=TemainfoSistemas/truly-ui&utm_campaign=badger)
[![Build Status](https://travis-ci.org/TemainfoSistemas/truly-ui.svg?branch=master)](https://travis-ci.org/TemainfoSistemas/truly-ui) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Dependency Status](https://david-dm.org/TemainfoSistemas/truly-ui.svg)](https://david-dm.org/TemainfoSistemas/truly-ui)



## Installation

To install this library, run:

```bash
$ npm install truly-ui --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install truly-ui
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library, for example the InputComponent:
import { InputModule } from 'truly-ui';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Specify your library as an import
    InputModule
    LibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<tl-input [toUpperCase]="true"
          [(ngModel)]="title"
          [placeholder]="'My Input Placeholder'">
</tl-input>
```

## License

MIT © [Temainfo Sistemas](mailto:suporte@temainfo.com.br)
