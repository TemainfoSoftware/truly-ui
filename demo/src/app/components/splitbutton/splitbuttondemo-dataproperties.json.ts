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
    name: "type",
    type: "string",
    default: "button",
    description: "Type of button.",
    options: "button | submit | reset"
  },
  {
    name: "text",
    type: "string",
    default: "null",
    description: "Displays a text button.",
    options: "any text"
  },
  {
    name: "width",
    type: "number",
    default: "125 (min)",
    description: "Button width.",
    options: "number | ex: 150"
  },
  {
    name: "height",
    type: "number",
    default: "39",
    description: "SplitButton height.",
    options: "number | ex: 30"
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the button if set to true.",
    options: "true | false"
  },
  {
    name: "buttonClass",
    type: "string",
    default: "null",
    description: "Style class of the button.",
    options: "CSS class"
  },
  {
    name: "iconAddonBefore",
    type: "string",
    default: "null",
    description: "Creates an icon in the addon before the text button.",
    options: "ion-printer | fa fa-home | any"
  },
  {
    name: "buttonAddonBeforeClass",
    type: "string",
    default: "null",
    description: "Style class of the addon before.",
    options: "CSS class"
  },
  {
    name: "iconAddonAfter",
    type: "string",
    default: "null",
    description: "Creates an icon in the addon after the text button.",
    options: "ion-printer | fa fa-home | any"
  },
  {
    name: "buttonAddonAfterClass",
    type: "string",
    default: "null",
    description: "Style class of the addon after.",
    options: "CSS class"
  },
  {
    name: "iconBeforeText",
    type: "string",
    default: "null",
    description: "Creates an icon before the text button.",
    options: "ion-printer | fa fa-home | any"
  },
  {
    name: "iconBeforeTextClass",
    type: "string",
    default: "null",
    description: "Style class of the icon before the text button.",
    options: "CSS class"
  },
  {
    name: "iconAfterText",
    type: "string",
    default: "null",
    description: "Creates an icon after the text button.",
    options: "ion-printer | fa fa-home | any"
  },
  {
    name: "iconAfterTextClass",
    type: "string",
    default: "null",
    description: "Style class of the icon after the text button.",
    options: "CSS class"
  },
  {
    name: "toggleClass",
    type: "string",
    default: "null",
    description: "Style class of the toggle button.",
    options: "CSS class"
  },
  {
    name : "splitButtonClass",
    type: "string",
    default: "null",
    description: "Style class of the splitbutton.",
    options: "CSS class"
  },
  {
    name : "actionMenuClass",
    type: "string",
    default: "null",
    description: "Style class of the action menu.",
    options: "CSS class"
  }
  ];
export const dataProperties2 = [
  {
    name: "label",
    type: "string",
    default: "null",
    description: "Displays an action text.",
    options: "any text"
  },
  {
    name: "icon",
    type: "string",
    default: "null",
    description: "Creates an icon before the action text.",
    options: "ion-printer | fa fa-home | any"
  },
  {
    name: "separator",
    type: "boolean",
    default: "false",
    description: "Creates a separator below action label if set to true.",
    options: "true | false"
  }
];
