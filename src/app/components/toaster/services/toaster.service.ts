/*
 MIT License

 Copyright (c) 2017 Temainfo Sistemas

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
import { ComponentFactoryResolver, ComponentRef, ViewContainerRef, Injectable } from '@angular/core';
import { TlToaster } from '../toaster';
import { ToasterConfig } from '../toaster-config';

@Injectable()
export class ToasterService {

  private view: ViewContainerRef;

  private toaster: ComponentRef<any>;

  private listToasters = [];

  constructor(private compiler: ComponentFactoryResolver) {}

  setView(view: ViewContainerRef) {
    this.view = view;
  }

  createToasterComponent(toasterConfig: ToasterConfig) {
    const componentFactory = this.compiler.resolveComponentFactory( TlToaster );
    this.toaster = this.view.createComponent(componentFactory);
    (<TlToaster>this.toaster.instance).setProperties(toasterConfig);
    (<TlToaster>this.toaster.instance).setServiceInstance(this);
    (<TlToaster>this.toaster.instance).setComponentRef(this.toaster);
  }

  success(toasterConfig: ToasterConfig) {
    this.createToasterComponent(toasterConfig);
    (<TlToaster>this.toaster.instance).icon = 'ion-checkmark';
    (<TlToaster>this.toaster.instance).color = 'primary';
    this.listToasters.push(this.toaster);
  }

  info(toasterConfig: ToasterConfig) {
    this.createToasterComponent(toasterConfig);
    (<TlToaster>this.toaster.instance).icon = 'ion-ios-information-outline';
    (<TlToaster>this.toaster.instance).color = 'information';
    this.listToasters.push(this.toaster);
  }

  danger(toasterConfig: ToasterConfig) {
    this.createToasterComponent(toasterConfig);
    (<TlToaster>this.toaster.instance).icon = 'ion-close-circled';
    (<TlToaster>this.toaster.instance).color = 'danger';
    this.listToasters.push(this.toaster);
  }

  warning(toasterConfig: ToasterConfig) {
    this.createToasterComponent(toasterConfig);
    (<TlToaster>this.toaster.instance).icon = 'ion-android-warning';
    (<TlToaster>this.toaster.instance).color = 'warning';
    this.listToasters.push(this.toaster);
  }

  removeToaster(component: ComponentRef<any>) {
    this.listToasters.splice(this.listToasters.indexOf(component), 1);
  }

  getListToasters() {
    return this.listToasters;
  }


}
