/**
 * Created by William on 23/06/2017.
 */
export const dataProperties = [
  {
    name: "icon",
    type: "string",
    default: "null",
    description: "Icon of Window",
    options: "ion-printer | fa fa-home | any"
  },
  {
    name: "title",
    type: "string",
    default: "My Modal",
    description: "Title of window dialog",
    options: "Any Text"
  },
  {
    name: "color",
    type: "string",
    default: "#53C68C",
    description: "Color of window dialog header",
    options: "Hexadecimal"
  },
  {
    name: "fontColor",
    type: "string",
    default: "#fff",
    description: "Font Color of window dialog header",
    options: "Hexadecimal"
  },
  {
    name: "width",
    type: "string",
    default: "500px",
    description: "Width of window dialog",
    options: "Any CSS selector measure"
  },
  {
    name: "height",
    type: "string",
    default: "500px",
    description: "Height of window dialog",
    options: "Any CSS selector measure"
  },
  {
    name: "draggable",
    type: "boolean",
    default: "true",
    description: "Control if window dialog is draggrable or not",
    options: "true | false"
  },
  {
    name: "maximizable",
    type: "boolean",
    default: "true",
    description: "Control if window dialog is maximizable or not",
    options: "true | false"
  },
  {
    name: "minimizable",
    type: "boolean",
    default: "true",
    description: "Control if window dialog is minimizable or not",
    options: "true | false"
  },
  {
    name: "restoreMaximize",
    type: "boolean",
    default: "true",
    description: "Handle if can be restorable or not",
    options: "true | false"
  },
  {
    name: "backdrop",
    type: "boolean",
    default: "false",
    description: "Background overlay of modal",
    options: "true | false"
  },
  {
    name: "fullscreen",
    type: "boolean",
    default: "false",
    description: "Opens the modal in fullscreen mode",
    options: "true | false"
  }
  ];
