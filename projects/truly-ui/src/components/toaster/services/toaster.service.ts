/*
 MIT License

 Copyright (c) 2019 Temainfo Sistemas

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
  ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef,
  Injectable, Injector,
} from '@angular/core';
import { ToasterConfig } from '../toaster-config';
import { Toaster } from '../parts/model/toaster';
import { TlToasterContainer } from '../toaster-container';

let uniqueId = 0;

@Injectable()
export class ToasterService {

  private listToasters = [];

  private toaster: Toaster;

  private toasterContainer: ComponentRef<TlToasterContainer>;

  constructor( private app: ApplicationRef, private injector: Injector, private compiler: ComponentFactoryResolver ) {
  }

  createToaster( toasterConfig: ToasterConfig ) {
    if ( !this.toasterContainer ) {
      this.toasterContainer = this.compiler.resolveComponentFactory( TlToasterContainer ).create( this.injector );
      this.toasterContainer.instance.toasterService = this;
      this.app.attachView( this.toasterContainer.hostView );

      const domElem = (this.toasterContainer.hostView as EmbeddedViewRef<any> )
        .rootNodes[ 0 ] as HTMLElement;
      document.body.appendChild( domElem );
    }
    this.toasterContainer.instance.position = toasterConfig.position;
    this.toasterContainer.instance.width = toasterConfig.width;
    this.toaster = new Toaster();
    this.toaster = Object.assign( this.toaster, toasterConfig );
  }

  success( toasterConfig: ToasterConfig ) {
    this.createToaster( toasterConfig );
    this.toaster.icon = 'ion ion-ios-checkmark-circle-outline';
    this.toaster.color = 'success';
    this.toaster.id = 'toaster-sucess-' + uniqueId++;
    this.addToaster();
  }

  information( toasterConfig: ToasterConfig ) {
    this.createToaster( toasterConfig );
    this.toaster.icon = 'ion ion-ios-information-circle-outline';
    this.toaster.color = 'information';
    this.toaster.id = 'toaster-information-' + uniqueId++;
    this.addToaster();
  }

  danger( toasterConfig: ToasterConfig ) {
    this.createToaster( toasterConfig );
    this.toaster.icon = 'ion ion-ios-close-circle-outline';
    this.toaster.color = 'danger';
    this.toaster.id = 'toaster-danger-' + uniqueId++;
    this.addToaster();
  }

  warning( toasterConfig: ToasterConfig ) {
    this.createToaster( toasterConfig );
    this.toaster.icon = 'ion ion-ios-warning';
    this.toaster.color = 'warning';
    this.toaster.id = 'toaster-warning-' + uniqueId++;
    this.addToaster();
  }

  private addToaster() {
    this.listToasters = [ ...this.listToasters, this.toaster ];
  }

  close( id: string ) {
    this.listToasters.forEach( ( item ) => {
      if ( item.id === id ) {
        item.closed = true;
      }
    } );
    this.listToasters = this.listToasters.filter( ( item ) => item.id !== id );
  }

  getListToasters() {
    return this.listToasters;
  }

}
