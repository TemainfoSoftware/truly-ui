/**
 * Created by William on 23/06/2017.
 */
export const dataProperties = [
  {
    name: "data",
    type: "Array<Object>",
    default: "null",
    description: "Array of data to shown on list.",
    options: "any text"
  },
  {
    name: "query",
    type: "string",
    default: "null",
    description: "Key that going to be used to search.",
    options: "any text"
  },
  {
    name: "label",
    type: "string",
    default: "null",
    description: "Key that will shown on label list.",
    options: "any text"
  },
  {
    name: "labelSize",
    type: "css measure",
    default: "120px",
    description: "Width of label.",
    options: "css measure"
  },
  {
    name: "labelTag",
    type: "string",
    default: "query",
    description: "Defines what text will be shown on text tag.",
    options: "Object Key"
  },
  {
    name: "icon",
    type: "string",
    default: "null",
    description: "Key that will shown on icon section of list item.",
    options: "FontAwesome Class | IonIcons class"
  },
  {
    name: "detail",
    type: "string",
    default: "null",
    description: "Key that will shown on detail section of list item.",
    options: "Object Key"
  },
  {
    name: "color",
    type: "string",
    default: "null",
    description: "Key that going to be used to change the color tag.",
    options: "any text"
  },
  {
    name: "itemHeight",
    type: "string",
    default: "10",
    description: "Height of item list.",
    options: "css measure"
  },
  {
    name: "itemAmount",
    type: "number",
    default: "5",
    description: "Number of itens that going to be shown on list.",
    options: "any number"
  },
  {
    name: "minLengthSearch",
    type: "number",
    default: "2",
    description: "Number of itens that going to be shown on list.",
    options: "any number"
  },
  {
    name: "placeholder",
    type: "string",
    default: "null",
    description: "Placeholder of the input.",
    options: "any text"
  },
  {
    name: "openFocus",
    type: "boolean",
    default: "null",
    description: "Controls if the list will be show on input focus.",
    options: "any text"
  },
  {
    name: "sortAlphabetically",
    type: "boolean",
    default: "false",
    description: "Controls if the list will be show sorted alphabetically.",
    options: "true | false"
  },
  {
    name: "detailOnTag",
    type: "boolean",
    default: "false",
    description: "Controls if the tag will be shown with the detail.",
    options: "true | false"
  },
  {
    name: "defaultColorTag",
    type: "string",
    default: "#66CC99",
    description: "The background color default for all tags.",
    options: "Hexadecimal"
  },
  {
    name: "defaultIconTag",
    type: "string",
    default: "null",
    description: "The icon default for all tags.",
    options: "FontAwesome Class | IonIcons class"
  },
  ];

