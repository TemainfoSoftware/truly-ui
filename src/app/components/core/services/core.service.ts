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

import { Injectable, Optional, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { ApplicationConfig } from '../configs/application.config';
import { TlCore } from '../core';

@Injectable()
export class CoreService {

    private applicationRef: ApplicationRef;

    private coreInstance: TlCore;

    constructor( private compiler: ComponentFactoryResolver,
                 private injector: Injector,
     @Optional() private config: ApplicationConfig) {
       this.applicationRef = this.injector.get(ApplicationRef);
       this.createCoreComponent();
    }

    createCoreComponent() {
      setTimeout(() => {
        const componentFactory = this.compiler.resolveComponentFactory( TlCore );
        const ref = componentFactory.create(this.injector);
        this.coreInstance = ref.instance;
        this.coreInstance.setTheme( this.config.theme );
        this.applicationRef.attachView(ref.hostView);
        this.applicationRef.tick();
      }, 1);
    }

}
