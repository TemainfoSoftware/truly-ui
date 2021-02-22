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
import {LightboxService} from '../lightbox/services/lightbox.service';
import {ImageUploadInterface} from './interfaces/image-upload.interface';
import {debounceTime} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {I18nService} from '../i18n/i18n.service';

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

  @Input() resizeDragndrop = false;

  @Input('imageList')
  set imageList( value: ImageUploadInterface[] ) {
    this._imageList = value.sort((a, b) => a.index - b.index );
  }

  get imageList() {
    return this._imageList;
  }

  @Input() imageSrc;

  @Input() imageSrcMimeType;

  @Input() isLoading = false;

  @Input() debounce = 380;

  @Input() deleteControl = true;

  @Input() viewControl = true;

  @Input() acceptFiles = 'image/*,application/pdf';

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

  public boxDescription = this.i18nService.getLocale().Upload.boxDescription;

  public placeholder = this.i18nService.getLocale().Upload.placeholder;

  public upload = this.i18nService.getLocale().Upload.upload;

  constructor(private i18nService: I18nService, private lightboxService: LightboxService) {
  }

  ngOnInit() {
    this.filtering.pipe(
      debounceTime( this.debounce ),
    ).subscribe((value) => {
      this.updateChange.emit(value);
    });
    this.subscription.add(this.uploading.subscribe(value => {
      this.uploadChange.emit( value );
    }));
  }

  open($event) {
    if (this.inputSingle || this.inputMultiple) {
      this.type !== 'dragndrop' ? this.inputSingle.nativeElement.click() : this.inputMultiple.nativeElement.click();
      $event.stopPropagation();
    }
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
        value = Object.assign({title: '', description: '', type: this.getBase64MimeType(value.file)}, value);
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
        resolve({index: index, file: (<FileReader>event.target).result});
      };
    });
  }

  viewImage($event, file) {
    $event.stopPropagation();
    if (this.type === 'box') {
      return this.view.emit(this.imageSrc);
    }
    this.lightboxService.create(this.imageList, file);
  }

  remove(file, imgSrc, event) {
    event.stopPropagation();
    if (imgSrc) {
      this.imageSrc = null;
      this.deleteChange.emit(this.imageSrc);
    }
    if (file) {
      this.imageList = this.imageList.filter((item, idx) => file.index !== idx);
      this.imageList.forEach((item, idx) => item.index = idx);
      this.deleteChange.emit(this.imageList);
    }
  }

  hasRisize() {
    return (this.resizeDragndrop && this.type === 'dragndrop' && this.imageList.length > 0);
  }

  onChange($event) {
    if ($event.target.files.length > 0) {
      const filesAccepet = this.filterFilesAccpet($event.target.files);
      if (this.type === 'dragndrop') {
        return this.readFiles(filesAccepet);
      }
      const reader = new FileReader();
      reader.readAsDataURL(filesAccepet[0]);
      reader.onload = (event) => {
        this.imageSrc = (<FileReader>event.target).result;
        this.uploadChange.emit(this.imageSrc);
      };
    }
  }

  private filterFilesAccpet( files ) {
    const acceptFiles = [];
    for (let i = 0; i < files.length; i++) {
      const regexExpresison = this.acceptFiles
        .replace(  /\*/g, '.\*' )
        .replace( /\,/g, '|' ) ;
      const isAccept = new RegExp( regexExpresison ).test( files[ i ].type );
      if ( isAccept ) {
        acceptFiles.push(files[i]);
      }
    }
    return acceptFiles;
  }

  private getBase64MimeType(encoded) {
    let result = null;

    if (typeof encoded !== 'string') {
      return result;
    }

    const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

    if (mime && mime.length) {
      result = mime[1];
    }

    return result || 'image';
  }
}
