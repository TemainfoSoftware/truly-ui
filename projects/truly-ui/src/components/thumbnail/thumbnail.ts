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

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef} from '@angular/core';
import { LightboxService } from '../lightbox/services/lightbox.service';
import {ThumbnailService} from './thumbnail.service';

@Component({
  selector: 'tl-thumbnail',
  templateUrl: './thumbnail.html',
  styleUrls: ['./thumbnail.scss'],
})
export class TlThumbnail implements OnInit, OnChanges {

  @Input() image;

  @Input() mimeType;

  @Input() data: { index?: number; description?: string, file: string, type: string }[] = [];

  @Input() bordered = true;

  @Input() shape: 'square' | 'circle' = 'square';

  @Input() size: { width: string, height: string } = { width: '80px', height: '80px' };

  @Input() overlayTemplate: TemplateRef<any>;

  @Input() emptyTemplate: TemplateRef<any>;

  @Output() clickThumbnail = new EventEmitter();

  constructor(private lightboxService: LightboxService, private thumbnailService: ThumbnailService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      if ((changes['data'].currentValue as Array<{ index?: number; description?: string, file: string, type: string }>).length > 0) {
        this.data = (changes['data'].currentValue as Array<any>).map( (file) => {
          file.type = !file.type ? this.thumbnailService.getMimeType(file.file) : file.type;
          return file;
        });
      }
    }
  }

  get isCircle() {
    return this.shape === 'circle';
  }

  onViewImage( image ) {
    this.lightboxService.create( this.data, image);
  }

}
