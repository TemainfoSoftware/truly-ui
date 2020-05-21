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
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LightboxService} from '../lightbox/services/lightbox.services';
import {ImageUploadInterface} from './interfaces/image-upload.interface';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'tl-upload',
  templateUrl: './upload.html',
  styleUrls: ['./upload.scss'],
})
export class TlUpload implements OnInit {

  @Input() type: 'dragndrop' | 'box' = 'dragndrop';

  @Input() showAsList = true;

  @Input() action = '';

  @Input() height = '100%';

  @Input('imageList')
  set imageList( value: ImageUploadInterface[] ) {
    this._imageList = value.sort((a, b) => a.index - b.index );
  }

  get imageList() {
    return this._imageList;
  }

  @Input() imageSrc;

  @Input() isLoading = false;

  @Input() deleteControl = true;

  @Input() viewControl = true;

  @ViewChild('inputMultiple', {static: false}) inputMultiple;

  @ViewChild('inputSingle', {static: false}) inputSingle;

  @Output() view = new EventEmitter();

  @Output() uploadChange = new EventEmitter();

  @Output() deleteChange = new EventEmitter();

  @Output() updateChange = new EventEmitter();

  private filtering: Subject<any> = new Subject();

  private uploading: Subject<any> = new Subject();

  private subscription: Subscription = new Subscription();

  private _imageList = [];

  constructor(private lightboxService: LightboxService) {
  }

  ngOnInit() {
    this.filtering.pipe(
      debounceTime(250),
    ).subscribe((value) => {
      this.updateChange.emit(value);
    });
    this.subscription.add(this.uploading.subscribe(value => {
      this.uploadChange.emit( value );
    }));
  }

  open($event) {
    this.type !== 'dragndrop' ? this.inputSingle.nativeElement.click() : this.inputMultiple.nativeElement.click();
    $event.stopPropagation();
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
    this.readFiles(fileList);
  }

  onChangeDescription() {
    this.filtering.next(this.imageList);
  }

  readFiles(fileList) {
    for (let i = 0; i < fileList.length; i++) {
      this.readFile(fileList[i], i).then((value: ImageUploadInterface) => {
        value.index = this.imageList.length;
        this.imageList = [ ...this.imageList, value ];
        if ( fileList.length <= this.imageList.length ) {
          this.uploading.next( this.imageList );
        }
      });
    }
  }

  readFile(file, index) {
    const reader = new FileReader();
    return new Promise(resolve => {
      reader.readAsDataURL(file);
      reader.onloadend = ( event ) => {
        resolve({index: index, image: (<FileReader>event.target).result});
      };
    });
  }

  viewImage($event, image) {
    $event.stopPropagation();
    if (this.type === 'box') {
      return this.view.emit(this.imageSrc);
    }
    this.lightboxService.create(this.imageList, image);
  }

  remove(image, imgSrc, event) {
    event.stopPropagation();
    if (imgSrc) {
      this.imageSrc = null;
      this.deleteChange.emit(this.imageSrc);
    }
    if (image) {
      this.imageList = this.imageList.filter((item, idx) => image.index !== idx);
      this.imageList.forEach((item, idx) => item.index = idx);
      this.deleteChange.emit(this.imageList);
    }
  }

  onChange($event) {
    if ($event.target.files.length > 0) {
      if (this.type === 'dragndrop') {
        return this.readFiles($event.target.files);
      }
      const reader = new FileReader();
      reader.readAsDataURL($event.target.files[0]);
      reader.onload = (event) => {
        this.imageSrc = (<FileReader>event.target).result;
        this.uploadChange.emit(this.imageSrc);
      };
    }
  }

}
