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
    description: "Button height.",
    options: "number | ex: 25"
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
  }
  ];
