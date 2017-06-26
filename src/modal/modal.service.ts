/**
 * Created by William on 26/06/2017.
 */
import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { TlModal } from './modal';

@Injectable()
export class ModalService {
    private view : ViewContainerRef;

    constructor( private compiler : ComponentFactoryResolver ) {}

    setView(view) {
        this.view = view;
    }

    createModal() {
        const componentFactory = this.compiler.resolveComponentFactory( TlModal );
        this.view.createComponent( componentFactory );
    }
}
