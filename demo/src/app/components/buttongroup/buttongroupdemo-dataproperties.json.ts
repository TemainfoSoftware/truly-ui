/**
 * Created by Silvio on 07/07/2017.
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
    options: "CSS class"
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
    options: "CSS class"
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
    options: "CSS class"
  },
  {
    name: "iconLeftTextButton",
    type: "string",
    default: "null",
    description: "Creates an icon on the left side of the text button.",
    options: "ion-printer | fa fa-home | any"
  },
  {
    name : "iconRightTextButton",
    type : "string",
    default : "null",
    description : "Creates an icon on the right side of the text button.",
    options : "ion-printer | fa fa-home | any"
  },
  {
    name: "toggle",
    type: "boolean",
    default: "false",
    description: "Change the button to toggle button if set to true.",
    options: "true | false"
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
