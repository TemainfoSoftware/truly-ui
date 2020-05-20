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

import {ChangeDetectorRef, Component, EventEmitter, HostListener, OnInit} from '@angular/core';
import {ImageLightboxInterface} from './interfaces/image.interface';

@Component({
  selector: 'tl-lightbox',
  templateUrl: './lightbox.html',
  styleUrls: ['./lightbox.scss'],
})
export class TlLightbox implements OnInit {

  public isOpen = true;

  public images: ImageLightboxInterface[] = [];

  public imageSelected: ImageLightboxInterface;

  public close = new EventEmitter();

  @HostListener('click')
  onClick() {
    this.close.emit();
  }

  constructor( private changes: ChangeDetectorRef ) {}

  ngOnInit() {}

  init( images: ImageLightboxInterface[], current ) {
    this.images = images;
    this.imageSelected = !current ? images[0] : current;
    this.changes.detectChanges();
  }

  previous($event) {
    this.stopEvent($event);
    if ( this.imageSelected.index > 0 ) {
      this.imageSelected = this.images.find( ( item ) => ((this.imageSelected.index - 1) === item.index));
    }
  }

  next( $event ) {
    this.stopEvent($event);
    if ( this.imageSelected.index < this.images.length - 1 ) {
      this.imageSelected = this.images.find( ( item ) => ((this.imageSelected.index + 1) === item.index));
    }
  }

  selectImage( $event, item ) {
    this.stopEvent($event);
    this.imageSelected = item;
  }

  stopEvent( $event ) {
    $event.stopPropagation();
  }

}
