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

export const Validators = {
  invalidDatePattern: 'Invalid Date, value must match with pattern',
  fieldRequired: 'Field Required, please enter a value',
  invalidMinLength: 'Value must have {0} characters',
  patternNotMatch: 'Value does not match required pattern',
  invalidCPF: 'Invalid CPF',
  invalidCNPJ: 'Invalid CNPJ',
  invalidEmail: 'Invalid Email',
  invalidCreditCard: 'Invalid Credit Card',
  invalidPasswordRuleDigits: 'Invalid Password, must have at least one digit. ex: abc123',
  invalidPasswordRuleUppercase: 'Invalid Password, must have at least one Uppercase Letter. ex: abcY123',
  invalidPasswordRuleSpecial: 'Invalid Password, must have at least one Special Character. ex: abcY123@#!',
  invalidPasswordRuleLowerCase: 'Invalid Password, must have at least one lowercase letter. ex: abc',
};
