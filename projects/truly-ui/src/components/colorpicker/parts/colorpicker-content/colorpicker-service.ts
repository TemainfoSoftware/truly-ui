import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorPickerService {
  constructor() {}

  public presetColors: string[] = ['#666666', '#006699'];

  getPresetColor(): string[] {
    return this.presetColors;
  }

  addPresetColor(color: string) {
    this.presetColors = this.presetColors.concat(color);
  }
}
