import {Injectable} from '@angular/core';

@Injectable()
export class ColorPickerService {

  public positionSchemeX = 222;

  public positionSchemeY = -8;

  public positionHue = 0;

  public positionAlpha = 144;

  public opacity = 1;

  public rgbaColor = 'rgba(255,0,0,' + this.opacity + ')';

  public rgbaColorPreview = 'rgba(255,0,0,' + this.opacity + ')';

  public presetColors: string[] = [];

  constructor() {
  }

  getPositionHue(): number {
    return this.positionHue;
  }

  setPositionHue($event, left, width) {
    if ($event.clientX > left && $event.clientX < (left + width)) {
      this.positionHue = $event.clientX - left;
    }

    if ($event.clientX < left) {
      this.positionHue = 1;
    }

    if ($event.clientX > (left + width)) {
      this.positionHue = width;
    }
  }

  setPositionHueManual(pos) {
    this.positionHue = pos;
  }

  getPositionAlpha(): number {
    return this.positionAlpha;
  }

  setPositionAlpha($event, left, width) {
    if ($event.clientX > left && $event.clientX < (left + width)) {
      this.positionAlpha = $event.clientX - left;
    }

    if ($event.clientX < left) {
      this.positionAlpha = 1;
    }

    if ($event.clientX > (left + width)) {
      this.positionAlpha = width;
    }
  }

  setPositionAlphaManual(pos) {
    this.positionAlpha = pos;
  }

  getPositionSchemeX(): number {
    return this.positionSchemeX;
  }

  getPositionSchemeY(): number {
    return this.positionSchemeY;
  }

  setPositionScheme($event, left, top, width, height, midCursorWidth) {
    if ($event.clientX > left && $event.clientX < (left + width) && $event.clientY > top && $event.clientY < (top + height)) {
      this.positionSchemeX = $event.clientX - left - midCursorWidth;
      this.positionSchemeY = $event.clientY - top - midCursorWidth;
    }

    if ($event.clientX < left && $event.clientY > top && $event.clientY < (top + height)) {
      this.positionSchemeX = -midCursorWidth;
      this.positionSchemeY = $event.clientY - top - midCursorWidth;
    }

    if ($event.clientY < top && $event.clientX > left && $event.clientX < (left + width)) {
      this.positionSchemeX = $event.clientX - left - midCursorWidth;
      this.positionSchemeY = -midCursorWidth;
    }

    if ($event.clientX > (left + width) && $event.clientY > top && $event.clientY < (top + height)) {
      this.positionSchemeX = width - midCursorWidth;
      this.positionSchemeY = $event.clientY - top - midCursorWidth;
    }

    if ($event.clientY > (top + height) && $event.clientX > left && $event.clientX < (left + width)) {
      this.positionSchemeX = $event.clientX - left - midCursorWidth;
      this.positionSchemeY = height - midCursorWidth;
    }

    if ($event.clientX < left && $event.clientY < top) {
      this.positionSchemeX = -midCursorWidth;
      this.positionSchemeY = -midCursorWidth;
    }

    if ($event.clientY > (top + height) && $event.clientX < left) {
      this.positionSchemeX = -midCursorWidth;
      this.positionSchemeY = height - midCursorWidth;
    }

    if ($event.clientX > (left + width) && $event.clientY < top) {
      this.positionSchemeX = width - midCursorWidth;
      this.positionSchemeY = - midCursorWidth;
    }

    if ($event.clientY > (top + height) && $event.clientX > (left + width)) {
      this.positionSchemeX = width - midCursorWidth;
      this.positionSchemeY = height - midCursorWidth;
    }
  }

  setPositionSchemeManual(posX, posY) {
    this.positionSchemeX = posX;
    this.positionSchemeY = posY;
  }

  setOpacityColor(opacity) {
    this.opacity = opacity;
  }

  setRgbaColor(color) {
    this.rgbaColor = color;
  }

  setRgbaColorPreview(color) {
    this.rgbaColorPreview = color;
  }

  getPresetColor(): string[] {
    return this.presetColors;
  }

  setPresetColor(color: string) {
    if (!this.presetColors.filter((colors) => (colors === color)).length) {
      this.presetColors = this.presetColors.concat(color);
    }
    if (this.presetColors.length > 16) {
      this.presetColors.splice(0, 1);
    }
  }

}
