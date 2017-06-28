/**
 * Created by Silvio on 28/06/2017.
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
    name: "textButton",
    type: "string",
    default: "null",
    description: "Displays a text button.",
    options: "any text"
  },
  {
    name: "iconBefore",
    type: "Object | string",
    default: "null",
    description: "Creates an icon on the left side of the button.",
    options: "icon | backgroundColor | fontColor | fontSize"
  },
  {
    name: "iconBefore.icon",
    type: "string",
    default: "null",
    description: "Defines a name of an existing icon.",
    options: "ion-printer | fa fa-home | any"
  },
  {
    name: "iconBefore.backgroundColor",
    type: "string",
    default: "#E8E8E8",
    description: "Hex Color for background color.",
    options: "Hex color"
  },
  {
    name: "iconBefore.fontColor",
    type: "string",
    default: "#616161",
    description: "Hex color for font color.",
    options: "Hex color"
  },
  {
    name: "iconBefore.fontSize",
    type: "string",
    default: "16px",
    description: "Icon font size.",
    options: "Example: 16px"
  },
  {
    name: "iconAfter",
    type: "Object | string",
    default: "null",
    description: "Creates an icon on the right side of the button.",
    options: "icon | backgroundColor | fontColor | fontSize"
  },
  {
    name: "iconAfter.icon",
    type: "string",
    default: "null",
    description: "Defines a name of an existing icon.",
    options: "ion-printer | fa fa-home | any"
  },
  {
    name: "iconAfter.backgroundColor",
    type: "string",
    default: "#E8E8E8",
    description: "Hex Color for background color.",
    options: "Hex color"
  },
  {
    name: "iconAfter.fontColor",
    type: "string",
    default: "#616161",
    description: "Hex color for font color.",
    options: "Hex color"
  },
  {
    name: "iconAfter.fontSize",
    type: "string",
    default: "16px",
    description: "Icon font size.",
    options: "string | ex: 16px"
  },
  {
    name: "styleOptions",
    type: "Object | string",
    default: "null",
    description: "Sets a style for the button.",
    options: "backgroundColor | fontColor | fontSize"
  },
  {
    name: "styleOptions.backgroundColor",
    type: "string",
    default: "#E8E8E8",
    description: "Hex Color for background color.",
    options: "Hex color"
  },
  {
    name: "styleOptions.fontColor",
    type: "string",
    default: "#616161",
    description: "Hex color for font color.",
    options: "Hex color"
  },
  {
    name: "styleOptions.fontSize",
    type: "string",
    default: "15px",
    description: "Text button font size.",
    options: "string | ex: 15px"
  },
  {
    name: "iconLeftTextButton",
    type: "string",
    default: "null",
    description: "Creates an icon on the left side of the text button.",
    options: "ion-printer | fa fa-home | any"
  },
  {
    name: "iconRightTextButton",
    type: "string",
    default: "null",
    description: "Creates an icon on the right side of the text button.",
    options: "ion-printer | fa fa-home | any"
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the button if set to true.",
    options: "true | false"
  }
  ];
