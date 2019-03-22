

/*
 MIT License

 Copyright (c) 2019 Temainfo Sistemas

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
export const ModalConfig = [
  {
    name: 'factory',
    type: 'ComponentFactoryResolver',
    default: 'null',
    description: 'It is the instance of Component',
    options: 'ComponentFactoryResolver'
  },
  {
    name: 'executeAction',
    type: 'ActionsModal | string',
    default: 'null',
    description: 'Is the CRUD action to be executed.',
    options: 'I, U, D, V'
  },
  {
    name: 'deleteMessage',
    type: 'string',
    default: 'null',
    description: 'The message of dialog when the action is DELETE',
    options: 'text'
  },
  {
    name: 'identifier',
    type: 'string',
    default: 'null',
    description: 'An Identifier is a unique id that represents the modal form.',
    options: 'text | number'
  },
  {
    name: 'dataForm',
    type: 'object',
    default: 'null',
    description: 'It is the form value object used to populate the fields on creation.',
    options: 'object'
  },
  {
    name: 'actions',
    type: 'object',
    default: 'null',
    description: 'The object of actions',
    options: 'object'
  },
  {
    name: 'actions.insertCall',
    type: 'object',
    default: 'null',
    description: 'Object that receives a function that going to be called when action is INSERT.',
    options: 'object'
  },
  {
    name: 'actions.updateCall',
    type: 'object',
    default: 'null',
    description: 'Object that receives a function that going to be called when action is UPDATE.',
    options: 'object'
  },
  {
    name: 'actions.deleteCall',
    type: 'object',
    default: 'null',
    description: 'Object that receives a function that going to be called when action is DELETE.',
    options: 'object'
  },
  {
    name: 'actions.viewCall',
    type: 'object',
    default: 'null',
    description: 'Object that receives a function that going to be called when action is VIEW.',
    options: 'object'
  },
];
