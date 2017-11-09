
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
    options: 'Any Text'
  },
  {
    name: 'tooltip.placement',
    type: 'string',
    default: 'left',
    description: 'Position place of the Tooltip',
    options: 'top | right | bottom | left'
  },
  {
    name: 'tooltip.color',
    type: 'string',
    default: '#000',
    description: 'Hex Color for background color',
    options: 'Hex Color'
  },
  {
    name: 'tooltip.fontColor',
    type: 'string',
    default: '#fff',
    description: 'Hex color for font color',
    options: 'Hex Color'
  },
  {
    name: 'tooltip.width',
    type: 'string',
    default: '120px',
    description: 'Width of the Tooltip',
    options: 'string | ex: 200px'
  },
];
