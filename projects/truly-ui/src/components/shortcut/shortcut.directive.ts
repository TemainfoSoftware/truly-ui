/*
 MIT License

 Copyright (c) 2019 Temainfo Software

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

import { ContentChild, Directive, ElementRef, Input, AfterContentInit, Renderer2, OnDestroy, Optional, Inject } from '@angular/core';
import { ShortcutService } from './shortcut.service';
import { TlButton } from '../button/button';
import { SHORTCUT_CONFIG, ShortcutConfig } from './shortcut.config';

let elements = [];

let identifier = 0;

@Directive( {
  selector: '[shortcut]'
} )
export class ShortcutDirective implements AfterContentInit, OnDestroy {

  @Input() shortcut = '';

  @ContentChild( TlButton ) tlbutton;

  private component;

  private shortcutID = 'shortcut-' + identifier++;

  constructor( @Optional() @Inject( SHORTCUT_CONFIG ) private shortcutConfig: ShortcutConfig,
               private element: ElementRef, private shortcutService: ShortcutService, private renderer: Renderer2 ) {
    this.shortcutService.setRenderer( this.renderer );
    this.shortcutService.setConfig(this.shortcutConfig);
  }

  ngAfterContentInit() {
    this.component = {
      id: this.shortcutID,
      shortcut: this.shortcut,
      element: this.tlbutton ? this.tlbutton : this.element
    };
    this.addElement();
  }

  addElement() {
    if ( this.component.shortcut.length > 0 ) {
      elements.push( this.component );
      this.shortcutService.elementsListener = elements;
      this.shortcutService.filterButtons();
    }
  }

  removeShortcut( id: string ) {
    elements = elements.filter( ( value ) => {
      return value.id !== id;
    } );
  }

  ngOnDestroy() {
    this.removeShortcut( this.shortcutID );
  }

}
