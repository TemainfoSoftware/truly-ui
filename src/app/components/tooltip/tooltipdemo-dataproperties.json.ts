
export const data = [
  {
    name: 'tooltip',
    type: 'Object',
    default: 'null',
    description: 'Receive a Object of configuration for Tooltip',
    options: 'text | placement | color | fontColor | width'
  },
  {
    name: 'tooltip.text',
    type: 'string',
    default: 'null',
    description: 'Receive the text itself',
    options: 'any text'
  },
  {
    name: 'tooltip.placement',
    type: 'string',
    default: 'left',
    description: 'Position place of the Tooltip',
    options: 'left-top | left-center | left-bottom | right-top | right-center | right-bottom | top-center | bottom-center'
  },
  {
    name: 'tooltip.color',
    type: 'string',
    default: '#242525',
    description: 'Hex Color for background color',
    options: 'Hex | RGBA'
  },
  {
    name: 'tooltip.fontColor',
    type: 'string',
    default: '#fff',
    description: 'Hex color for font color',
    options: 'Hex | RGBA'
  },
  {
    name: 'tooltip.width',
    type: 'string',
    default: '120px',
    description: 'Width of the Tooltip',
    options: 'px'
  },
];
