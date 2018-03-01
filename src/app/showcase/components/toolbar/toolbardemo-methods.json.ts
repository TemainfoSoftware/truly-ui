export const dataMethods = [
  {
    name: 'toggle',
    parameters: [
      {
        event: 'MouseEvent', description: 'Native Mouse Event',
      },
      {
        event: 'Target', description: 'Target element to align the panel, defaults to event.target'
      }
    ],
    description: 'Toggles the visibility of the panel.',
  },
];
