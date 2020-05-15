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
import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'tl-upload',
  templateUrl: './upload.html',
  styleUrls: ['./upload.scss'],
})
export class TlUpload implements OnInit {

  @Input() type: 'dragndrop' | 'box' = 'dragndrop';

  @ViewChild('fileInput', {static: false}) fileInput;

  public file;

  public imageList = [];

  public imageSrc;

  constructor() {
  }

  ngOnInit() {
  }

  open() {
    this.fileInput.nativeElement.click();
  }

  onDragOver(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'copy';
  }

  onDrop(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    const fileList = ev.dataTransfer.files;
    this.readFiles( fileList );
  }

  readFiles( fileList ) {
    for ( let i = 0; i < fileList.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(fileList[i]);
      reader.onload = (event) => {
        this.imageList.push( { index: i, image: (<FileReader>event.target).result } );
      };
    }
  }

  remove( image, imgSrc, event) {
    event.stopPropagation();
    if ( imgSrc ) {
      this.imageSrc = null;
    }
    if ( image ) {
      this.imageList = this.imageList.filter( (item, idx) => image.index !== idx);
    }
  }

  onChange($event) {
    this.file = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL($event.target.files[0]);
    reader.onload = (event) => {
      this.imageSrc = (<FileReader>event.target).result;
    };
  }

}
