import {Injectable} from '@angular/core';
import {TlItemSelectedDirective} from '../../core/directives/itemSelected/item-selected.directive';

@Injectable()
export class SelectedItemService {

  private _itemSelected: TlItemSelectedDirective;

  constructor() {
  }

  set itemSelected(item: TlItemSelectedDirective) {
    this._itemSelected = item;
  }

  get itemSelected() {
    return this._itemSelected;
  }

}
