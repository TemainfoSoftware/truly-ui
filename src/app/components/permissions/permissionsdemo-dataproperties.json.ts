/*
  MIT License

  Copyright (c) 2019 Temainfo Software

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/
export const dataProperties = [
  {
    name: 'data',
    type: 'Array<PermissionDataConfig>',
    default: 'null',
    description: 'Array of data to shown on list.',
    options: 'Array of PermissionDataConfig'
  },
  {
    name: 'permissions',
    type: 'Array<Permission>',
    default: 'null',
    description: 'Array of permissions used to compare the values.',
    options: 'Array of permissions'
  },
  {
    name: 'height',
    type: 'string',
    default: '100%',
    description: 'Permissions\'s Painel Height.',
    options: 'px | % | em'
  },
  {
    name: 'color',
    type: 'string',
    default: 'basic',
    description: 'Changes the default color of the permissions\'s Painel.',
    options: 'basic | primary | success | information | warning | danger | light | dark'
  },
  {
    name: 'keyGroup',
    type: 'string',
    default: 'description',
    description: 'Key used to describe title of group',
    options: 'any text'
  },
  {
    name: 'keyPermissions',
    type: 'string',
    default: 'permissions',
    description: 'Key used to describe the array of permissions',
    options: 'any text'
  },
  {
    name: 'keyPermissionValue',
    type: 'string',
    default: 'permission',
    description: 'Key used to describe the permission value used to compare with the data source provided.',
    options: 'any text'
  },
  {
    name: 'keyPermissionDescription',
    type: 'string',
    default: 'description',
    description: 'Key used to describe the title of permission.',
    options: 'any text'
  },
];
