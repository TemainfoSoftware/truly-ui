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
import {
  Component, Input, EventEmitter, Output, AfterContentInit, ViewChild, Renderer2, OnInit,
} from '@angular/core';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { TlButton } from '../button/button';
import { OverlayAnimation } from '../core/directives/overlay-animation';

@Component( {
  selector: 'tl-overlay-panel',
  templateUrl: './overlay-panel.html',
  styleUrls: [ './overlay-panel.scss' ],
  animations: [ OverlayAnimation ]
} )
export class TlOverlayPanel implements OnInit, AfterContentInit {

  @Input() elementOrigin;

  @Input() width = '100%';

  @Output() show: EventEmitter<any> = new EventEmitter();

  @Output() hide: EventEmitter<any> = new EventEmitter();

  @ViewChild( CdkConnectedOverlay, {static: true} ) cdkOverlay: CdkConnectedOverlay;

  public isOpen = false;

  constructor( private renderer: Renderer2 ) {}

  ngOnInit() {
    this.validateNullOrigin();
  }

  ngAfterContentInit() {
    this.cdkOverlay.origin = new CdkOverlayOrigin( this.getTargetElement() );
    this.listenElementOrigin();
  }

  private listenElementOrigin() {
    if ( this.elementOrigin ) {
      this.renderer.listen( this.getTargetElement(), 'click', () => {
        this.toggle();
      } );
    }
  }

  private validateNullOrigin() {
    if ( !this.elementOrigin ) {
      throw new Error( 'The [elementOrigin] property is required' );
    }
  }

  private getTargetElement() {
    return this.isElementTlButton() ? this.elementOrigin.buttonElement.nativeElement : this.elementOrigin;
  }

  private isElementTlButton() {
    return this.elementOrigin instanceof TlButton;
  }

  onBackdropClick() {
    this.close();
  }

  open() {
    this.isOpen = true;
    this.show.emit();
  }

  close() {
    this.isOpen = false;
    this.hide.emit();
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.isOpen ? this.show.emit() : this.hide.emit();
  }


}

