/*
    MIT License

    Copyright (c) 2019 Temainfo Software

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

import { APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { LazyApplicationLoaderConfig } from './configs/application.config';
import { CoreService } from './services/core.service';
import { TlCore } from './core';
import { APPLICATION_CONFIGURATION } from './tokens/configuration.token';

import { ModalModule } from '../modal/index';

export function CoreServiceFactory( coreService: CoreService ) {
    return () => coreService.initializeApp();
}

// @dynamic
@NgModule( {
    imports: [
      ModalModule.forRoot()
    ],
    declarations: [
      TlCore,
    ],
    exports: [
      TlCore,
    ],
    entryComponents: [
      TlCore
    ],
    providers: [
      CoreService,
      I18nService,
      {
        provide: APP_INITIALIZER,
        useFactory: CoreServiceFactory,
        deps: [ CoreService ],
        multi: true
      }
  ]
} )
export class CoreModule {

    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error( 'CoreModule is already loaded. Import it in the AppModule only !!!!!!!!');
        }
    }

    static forRoot( lazyApplicationLoaderConfig: LazyApplicationLoaderConfig ): ModuleWithProviders {
      return {
        ngModule: CoreModule,
        providers: [
          I18nService,
          {
            provide: APPLICATION_CONFIGURATION,
            // TODO: Create  useValue: Object.assign( new LazyApplicationLoaderConfig(), lazyApplicationLoaderConfig )
            useValue: lazyApplicationLoaderConfig
          }
        ]
      };
    }
}
