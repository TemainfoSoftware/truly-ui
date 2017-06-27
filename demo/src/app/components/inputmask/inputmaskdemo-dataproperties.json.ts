/**
 * Created by William on 23/06/2017.
 */
export const dataProperties = [
  {
    name: "mask",
    type: "Object | string",
    default: "null",
    description: "Receives an Oject of configuration for mask",
    options: "Object | string"
  },
  {
    name: "mask.mask",
    type: "string",
    default: "null",
    description: "The expression itself",
    options: "00/00/0000 | AAA-0000 | (099)-999999999"
  },
  {
    name: "mask.guides",
    type: "boolean",
    default: "true",
    description: "Show/Hide guides while typing",
    options: "true | false"
  },
  {
    name: "mask.withLiteralChar",
    type: "boolean",
    default: "false",
    description: "Show/Hide special chars returned value [ngModel]",
    options: "true | false"
  },
  {
    name: "mask.uppercase",
    type: "boolean",
    default: "false",
    description: "Show/Hide in uppercase value",
    options: "true | false"
  },
];
