/**
 * Created by William on 26/06/2017.
 */
import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { TlModal } from './modal';

let index = -1;

@Injectable()
export class ModalService {
    private view: ViewContainerRef;

    private minModals: any[] = [];

    private component;

    constructor( private compiler: ComponentFactoryResolver ) {}

    setView( view ) {
        this.view = view;
    }

    createModal( label ) {
        index++;
        const componentFactory = this.compiler.resolveComponentFactory( TlModal );
        this.component = this.view.createComponent( componentFactory );
        (<TlModal>this.component.instance).setServiceControl( this );
        (<TlModal>this.component.instance).setComponentRef( this.component );
        (<TlModal>this.component.instance).label = label;
        (<TlModal>this.component.instance).status = 'MAX';
        this.setZIndex();
    }

    setZIndex( indexModal? ) {
        this.component.instance.element.nativeElement.style.zIndex = indexModal + 1;
    }

    removeMinModals( indexModal ) {
        this.minModals.splice( indexModal, 1 );
    }

    minimize( component ) {
        console.log(component);
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

}
