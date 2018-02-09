/*
 MIT License

 Copyright (c) 2018 Temainfo Software

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
  ComponentFactoryResolver, ContentChild, Directive, OnDestroy, OnInit, Renderer2,
  ViewContainerRef
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { TlMessageValidationComponent } from '../components/messagevalidation/messagevalidation.component';
import { TlInput } from '../input';

@Directive( {
  selector: '[messageValidation]'
} )
export class MessageValidationDirective implements OnInit, OnDestroy {

  @ContentChild( NgModel ) model;

  @ContentChild( TlInput ) tlinput;

  private component;

  private listeners = [];

  constructor( private compiler: ComponentFactoryResolver, private view: ViewContainerRef, private renderer: Renderer2 ) {}

  ngOnInit() {
    this.listenFocus();
    this.listenFocusOut();
    this.listenChanges();
    this.listenScrollDocument();
  }

  listenScrollDocument() {
    this.listeners.push(this.renderer.listen(document, 'scroll', () => {
      this.setDisplayMessages(true);
    }));
  }

  listenFocus() {
    this.listeners.push(this.renderer.listen(this.tlinput.input.nativeElement, 'focus', () => {
      this.setDisplayMessages(false);
    }));
  }

  listenFocusOut() {
    this.listeners.push(this.renderer.listen(this.tlinput.input.nativeElement, 'focusout', () => {
      this.setDisplayMessages(true);
    }));
  }

  listenChanges() {
    this.model.statusChanges.subscribe( () => {
      this.model.control.errors ? this.createMessageValidation() : this.removeMessageValidation();
      this.setMessageValidation();
    } );
  }

  setMessageValidation() {
    if ( this.component && this.model.dirty ) {
     (<TlMessageValidationComponent>this.component.instance).setMessages( this.model.control.errors );
    }
  }

  setDisplayMessages(value) {
    if (this.component) {
      (<TlMessageValidationComponent>this.component.instance).hideMessages( value );
      (<TlMessageValidationComponent>this.component.instance).setInput( this.tlinput );
    }
  }

  createMessageValidation() {
    if ( !this.component ) {
      const componentFactory = this.compiler.resolveComponentFactory( TlMessageValidationComponent );
      this.component = this.view.createComponent( componentFactory );
      (<TlMessageValidationComponent>this.component.instance).setInput( this.tlinput );
    }
  }

  removeMessageValidation() {
    if ( this.component && !this.model.control.errors ) {
      this.view.remove( this.view.indexOf( this.component ) );
      this.component = null;
    }
  }

  ngOnDestroy() {
    this.listeners.forEach((item) => {
      item();
    });
  }

}
