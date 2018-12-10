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
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'tl-avatar',
  templateUrl: './avatar.html',
  styleUrls: ['./avatar.scss'],
})
export class TlAvatar implements OnInit {

  @Input() shape = 'square';

  @Input() size = '100px';

  @Input() src: string;

  @Input() gravatar: string;

  @Input() icon: string;

  @Input() text = 'G';

  @Input() gender: 'female' | 'male' = 'female';

  constructor() {
  }

  ngOnInit() {
    this.src = (this.gravatar) ? `//www.gravatar.com/avatar/${Md5.hashStr(this.gravatar)}?s=${this.size}&d=mm` : this.src;
  }

}
