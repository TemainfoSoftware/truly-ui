/**
 * Created by William on 26/06/2017.
 */
import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { TlModal } from './modal';
import { ModalResult } from '../core/enums/modal-result';

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

    createModal( component, title, icon, callback ) {
        index++;
        const componentFactory = this.compiler.resolveComponentFactory( TlModal );
        const factoryInject = this.compiler.resolveComponentFactory(component);
        this.setComponentInjected(componentFactory, factoryInject);
        this.setGlobalSettings(title, icon);
        this.callBack = callback;
    }

    setGlobalSettings(title, icon) {
        (<TlModal>this.component.instance).setServiceControl( this );
        (<TlModal>this.component.instance).setComponentRef( this.component );
        (<TlModal>this.component.instance).status = 'MAX';
        (<TlModal>this.component.instance).title = title;
        (<TlModal>this.component.instance).icon = icon;
        this.setZIndex();
    }

    setComponentInjected(componentFactory, factoryInject) {
        this.component = this.view.createComponent( componentFactory );
        this.componentInjected = (<TlModal>this.component.instance).body.createComponent( factoryInject );
    }

    setZIndex( indexModal? ) {
        this.component.instance.element.nativeElement.style.zIndex = indexModal + 1;
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
