/**
 * Created by William on 23/06/2017.
 */
export const dataProperties = [
  {
    name: 'labelGroup',
    type: 'string',
    default: 'Panel Group',
    description: 'Label of PanelGroup',
    options: 'any text'
  },
  {
    name: 'backgroundColor',
    type: 'string',
    default: 'null',
    description: 'The background color of the PanelGroup',
    options: 'Hex | RGBA'
  },
  {
    name: 'borderColor',
    type: 'string',
    default: 'null',
    description: 'Color of PanelGroup border',
    options: 'Hex | RGBA'
  },
  {
    name: 'width',
    type: 'string',
    default: '100%',
    description: 'Width of panel group.',
    options: 'px | % | em'
  },
  {
    name: 'fontColorCaption',
    type: 'string',
    default: 'null',
    description: 'Font color of caption of the PanelGroup',
    options: 'Hex | RGBA'
  },
  {
    name: 'fontSizeCaption',
    type: 'string',
    default: 'null',
    description: 'Font size of caption of the PanelGroup',
    options: 'px | % | em'
  }
  ];
