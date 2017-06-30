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
    name: "text",
    type: "string",
    default: "null",
    description: "Displays a text button.",
    options: "any text"
  },
  {
    name: "size",
    type: "string",
    default: "100px (min)",
    description: "Button size.",
    options: "string | ex: 150px"
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
    options: "Class CSS"
  },
  {
    name: "iconAddonBefore",
    type: "string",
    default: "null",
    description: "Creates an icon in the addon before the button.",
    options: "ion-printer | fa fa-home | any"
  },
  {
    name: "buttonAddonBeforeClass",
    type: "string",
    default: "null",
    description: "Style class of the addon before.",
    options: "Class CSS"
  },
  {
    name: "iconAddonAfter",
    type: "string",
    default: "null",
    description: "Creates an icon in the addon after the button.",
    options: "ion-printer | fa fa-home | any"
  },
  {
    name: "buttonAddonAfterClass",
    type: "string",
    default: "null",
    description: "Style class of the addon after.",
    options: "Class CSS"
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
  }
  ];
