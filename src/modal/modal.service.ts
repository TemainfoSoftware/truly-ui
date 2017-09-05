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
import { TlBackdrop } from '../backdrop/backdrop';

let index = -1;

@Injectable()
export class ModalService {

    public component;

    public componentList: any[] = [];

    public componentInjected;

    public backdrop;

    private callBack = Function();

    private view: ViewContainerRef;

    private minModals: any[] = [];

    constructor( private compiler: ComponentFactoryResolver ) {}

    setView( view ) {
        this.view = view;
    }

    createModal( component, modalOptions, callback ) {
        index++;
        if (modalOptions.backdrop) {
            this.createBackdrop(TlBackdrop);
        }
        this.setComponentModal();
        this.setComponentInjected( component );
        this.setGlobalSettings( modalOptions );
        this.callBack = callback;
    }

    setComponentModal() {
        const componentFactory = this.compiler.resolveComponentFactory( TlModal );
        this.component = this.view.createComponent( componentFactory );
        this.componentList.push(this.component);
        (<TlModal>this.component.instance).setServiceControl( this );
        (<TlModal>this.component.instance).setComponentRef( this.component );
    }

    setComponentInjected( component ) {
        const factoryInject = this.compiler.resolveComponentFactory( component );
        this.componentInjected = (<TlModal>this.component.instance).body.createComponent( factoryInject );
    }

    setGlobalSettings( modalOptions ) {
        (<TlModal>this.component.instance).status = 'MAX';
        (<TlModal>this.component.instance).setOptions( modalOptions );
        this.setZIndex();
    }

    setZIndex( element?, indexModal? ) {
        !element ? this.component.instance.element.nativeElement.firstChild.style.zIndex = (indexModal = 0) + 1 :
            element.nativeElement.style.zIndex = indexModal + 1;
    }

    createBackdrop( backdrop ) {
        const backdropFactory = this.compiler.resolveComponentFactory( backdrop );
        this.backdrop = this.view.createComponent( backdropFactory );
    }

    setBackdropModalOverModal() {
        setTimeout( () => {
            this.backdrop.instance.backdrop.nativeElement.style.display = 'none';
            this.setBackdropzIndex();
        }, 1 )
    }

    setBackdropzIndex() {
        this.backdrop.instance.backdrop.nativeElement.style.zIndex =
            this.component.instance.element.nativeElement.firstChild.style.zIndex - 1;
        setTimeout( () => {
            this.backdrop.instance.backdrop.nativeElement.style.display = 'block';
        }, 280 );
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
        let comp = component;
        this.componentList.forEach((value) => {
           if (value.location.nativeElement === component) {
               comp = value;
           }
        });
        this.componentList.splice(1, comp);
        this.removeBackdrop();
        this.view.remove( this.view.indexOf(comp));
    }

    removeBackdrop() {
        if (this.backdrop) {
            this.view.remove( this.view.indexOf(this.backdrop) );
        }
    }

    getMinModals() {
        return this.minModals;
    }

    execCallBack( result: any, component? ) {
        this.setMdResult( result );
        if ( this.isResultUndefined() ) {
            return;
        }
        if ( !(this.isMdResultEqualsNone( result.mdResult )) ) {
            this.close(component);
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
