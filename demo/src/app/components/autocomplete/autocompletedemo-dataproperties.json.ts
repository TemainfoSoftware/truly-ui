/*
 MIT License

 Copyright (c) 2017 Temainfo Sistemas

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
export const dataProperties = [
  {
    name: "data",
    type: "object | array",
    default: "null",
    description: "Sets the data of the Autocomplete.",
    options: "any object | any array"
  },{
    name: "data.display",
    type: "object | array",
    default: "null",
    description: "Sets the values ​​to be displayed in the list. (Use data property values)",
    options: "any object | any array"
  },{
    name: "data.query",
    type: "object | array",
    default: "null",
    description: "Sets the values ​​to be searched. (Use data property values)",
    options: "any object | any array"
  },{
    name: "data.valueField",
    type: "array",
    default: "null",
    description: "Set the value to be displayed in the input when the item is selected. (Use data property value)",
    options: "any array"
  },
  {
    name: "label",
    type: "string",
    default: "null",
    description: "Create a label together with Autocomplete.",
    options: "any text"
  },
  {
    name: "label.labelPlacement",
    type: "string",
    default: "left",
    description: "Sets the label position.",
    options: "left | top"
  },
  {
    name: "label.labelSize",
    type: "number",
    default: "100",
    description: "Sets the label width.",
    options: "any number"
  },
  {
    name: "placeholder",
    type: "string",
    default: "null",
    description: "Display a help text on autocomplete.",
    options: "any text"
  },
  {
    name: "clearButton",
    type: "boolean",
    default: "false",
    description: "Display an icon to clear any Input Value.",
    options: "any text"
  },
  {
    name: "minCharsToSearch",
    type: "number",
    default: "2",
    description: "Set minimum of characters to search.",
    options: "any number | ex: 4"
  }
];
