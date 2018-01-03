/*
    MIT License

    Copyright (c) 2018 Temainfo Sistemas

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

import {
  APP_INITIALIZER, InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf, ComponentFactoryResolver, Injector
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationConfig } from './configs/application.config';
import { CoreService } from './services/core.service';
import { TlCore } from './core';

export * from './core';

export function CoreServiceFactory( factory: ComponentFactoryResolver,
                                    injector: Injector,
                                    config: ApplicationConfig): Function {
    return () => new CoreService(factory, injector, config);
}

export const COMPONENT_FACTORY_RESOLVER = new InjectionToken<ComponentFactoryResolver>('COMPONENT_FACTORY_RESOLVER');
export const APPLICATION_CONFIGURATION = new InjectionToken<ApplicationConfig>('APPLICATION_CONFIGURATION');
export const INJECTOR = new InjectionToken<Injector>('INJECTOR');

@NgModule( {
    imports: [
      CommonModule,
    ],
    declarations: [
      TlCore,
    ],
    exports: [
      TlCore,
    ],
    providers: [
      CoreService
    ],
    entryComponents: [
      TlCore
    ]
} )
export class CoreModule {

    static forRoot( config: ApplicationConfig = new ApplicationConfig() ): ModuleWithProviders {
      return {
        ngModule: CoreModule,
        providers: [
          CoreService,
          {
            provide: APP_INITIALIZER,
            useFactory: CoreServiceFactory,
            deps: [COMPONENT_FACTORY_RESOLVER, INJECTOR, APPLICATION_CONFIGURATION],
            multi: true
          },
          {provide: COMPONENT_FACTORY_RESOLVER, useExisting: ComponentFactoryResolver},
          {provide: INJECTOR, useExisting: Injector},
          {provide: APPLICATION_CONFIGURATION, useValue: config},
        ]
      };
    }

    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error( 'CoreModule is already loaded. Import it in the AppModule only !!!!!!!!');
        }
    }
}
