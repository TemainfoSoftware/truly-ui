

 /*
 MIT License

 Copyright (c) 2019 Temainfo Sistemas

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
import { ToolbarConfigModel } from '../model/toolbar-config.model';

 export interface ToolbarConfig extends ToolbarConfigModel {
  font: {
    family:    { show: boolean, tooltipText: string }
    size:      { show: boolean, tooltipText: string }
    bold:      { show: boolean, tooltipText: string }
    italic:    { show: boolean, tooltipText: string }
    underline: { show: boolean, tooltipText: string }
    color:     { show: boolean, tooltipText: string }
    highlight: { show: boolean, tooltipText: string }
  };
  alignment: {
    left:      { show: boolean, tooltipText: string }
    center:    { show: boolean, tooltipText: string }
    right:     { show: boolean, tooltipText: string }
    justify:   { show: boolean, tooltipText: string }
  };
  lists: {
    ordered:   { show: boolean, tooltipText: string }
    unordered: { show: boolean, tooltipText: string }
  };
  others: {
    link:      { show: boolean, tooltipText: string }
    imageLink: { show: boolean, tooltipText: string }
    quote:     { show: boolean, tooltipText: string }
  };
}
