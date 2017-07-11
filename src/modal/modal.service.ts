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
import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { TlModal } from './modal';
import { ModalResult } from '../core/enums/modal-result';
import { ModalOptions } from './modal-options';

let index = -1;

@Injectable()
export class ModalService {
    private view: ViewContainerRef;

    private minModals: any[] = [];

    private component;

    private componentInjected;

    private callBack = Function();

    constructor( private compiler: ComponentFactoryResolver ) {}

    setView( view ) {
        this.view = view;
    }

    createModal( component, modalOptions, callback ) {
        index++;
        const componentFactory = this.compiler.resolveComponentFactory( TlModal );
        const factoryInject = this.compiler.resolveComponentFactory(component);
        this.setComponentInjected(componentFactory, factoryInject);
        this.setGlobalSettings( modalOptions );
        this.callBack = callback;
    }

    setGlobalSettings( modalOptions: Array<ModalOptions> ) {
        (<TlModal>this.component.instance).status = 'MAX';
        (<TlModal>this.component.instance).setServiceControl( this );
        (<TlModal>this.component.instance).setComponentRef( this.component );
        (<TlModal>this.component.instance).setOptions( modalOptions );
        this.setZIndex();
    }

    setComponentInjected(componentFactory, factoryInject) {
        this.component = this.view.createComponent( componentFactory );
        this.componentInjected = (<TlModal>this.component.instance).body.createComponent( factoryInject );
    }

    setZIndex( indexModal? ) {
        this.component.instance.element.nativeElement.style.zIndex = index + 1;
    }

    removeMinModals( indexModal ) {
        this.minModals.splice( indexModal, 1 );
    }

    minimize( component ) {
        component.instance.status = 'MIN';
        component.instance.element.nativeElement.style.display = 'none';
        this.minModals.push( component );
    }

    close( component ) {
        this.view.remove( this.view.indexOf(component));
    }

    getMinModals() {
        return this.minModals;
    }

    execCallBack( mdResult: any ) {
        this.setMdResult( mdResult );
        if ( this.isResultUndefined() ) {
            return;
        }
        if ( !(this.isMdResultEqualsNone( mdResult )) ) {
            this.close( this.component );
        }
        this.resultCallback();
    }

    isMdResultEqualsNone( mdResult: ModalResult ) {
        return Number( mdResult ) === Number( ModalResult.MRCUSTOM );
    }

    isResultUndefined() {
        return this.componentInjected.instance.modalResult === undefined;

    }

    setMdResult( mdResult: ModalResult ) {
        this.componentInjected.instance.modalResult = mdResult;
    }

    resultCallback() {
        this.callBack( this.componentInjected.instance.modalResult );
    }
}
