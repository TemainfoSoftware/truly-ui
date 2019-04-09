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
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  Output
} from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'tl-avatar',
  templateUrl: './avatar.html',
  styleUrls: ['./avatar.scss'],
})
export class TlAvatar implements OnInit, OnChanges {

  @Input() shape = 'square';

  @Input() size = '100px';

  @Input() src: string;

  @Input() gravatar: string;

  @Input() icon: string;

  @Input() text: string;

  @Input() char: string;

  @Input() fontColor: string;

  @Input() bgColor: string;

  @Input() gender: 'female' | 'male' = 'male';

  @Input() color = 'basic';

  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  public type = 'gender';

  public multiplierIcon;

  public multiplierText;

  public fontSize;

  public gravatarImg;

  constructor() { }

  ngOnInit() {
    this.defineType();
  }

  defineType() {
    if ( this.isSrc() ) {
      this.setSrc();
      return;
    }
    if ( this.isGravatar() ) {
      this.setGravatar();
      return;
    }
    if ( this.isIcon() ) {
      this.setIcon();
      return;
    }
    if ( this.isText() ) {
      this.setText();
      return;
    }
    if ( this.isChar() ) {
      this.setChar();
      return;
    }
  }

  private isSrc() {
    return this.src && this.src !== '';
  }

  private isGravatar() {
    return this.gravatar && this.gravatar !== '';
  }

  private isIcon() {
    return this.icon && this.icon !== '';
  }

  private isText() {
    return this.text && this.text !== '';
  }

  private isChar() {
    return this.char && this.char !== '';
  }

  private setSrc() {
    this.type = 'src';
  }

  private setGravatar() {
    const sizeGravatar = ( this.isPercentage() ) ? '200px' : this.size;
    this.gravatarImg = `http://www.gravatar.com/avatar/${Md5.hashStr(this.gravatar)}?s=${sizeGravatar}&d=mm`;
    this.type = 'gravatar';
  }

  private setIcon() {
    this.multiplierIcon = ( this.isPercentage() ) ? 25 : 0.7;
    this.type = 'icon';
  }

  private setText() {
    this.multiplierText = ( this.isPercentage() ) ? 8 : 0.2;
    this.fontSize = ( this.isOneCharacter() ) ? '2em' : '1em';
    this.type = 'text';
  }

  private setChar() {
    this.multiplierText = ( this.isPercentage() ) ? 8 : 0.2;
    this.fontSize = '2em';
    this.type = 'char';
    this.char = this.char.substr(0, 1).toUpperCase();
  }

  public isPercentage() {
    return this.size.substr(this.size.length - 1) === '%';
  }

  private isOneCharacter() {
    return this.text && this.text.length === 1;
  }

  selectedAvatar($event) {
    this.selected.emit($event);
  }

  ngOnChanges( changes ) {
    if ( changes['gravatar'] ) {
      this.defineType();
    }
  }

}
