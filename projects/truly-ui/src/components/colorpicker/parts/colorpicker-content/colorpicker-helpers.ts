import { Hsla, Rgba } from './colorpicker-formats';

export class ColorPickerHelpers {
  rgbaToHex(rgba: Rgba, allowHex8?: boolean): string {
    let hex = '#' + ((1 << 24) | (rgba.r << 16) | (rgba.g << 8) | rgba.b).toString(16).substr(1);
    if (allowHex8) {
      hex += ((1 << 8) | Math.round(rgba.a * 255)).toString(16).substr(1);
    }
    return hex;
  }

  hexToRgb(hex): Array<number> {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const a = Math.round((parseInt(hex.substring(7, 9), 16) / 255) * 100) / 100;
    return (hex.length > 7) ? [r, g, b] : [r, g, b];
  }

  hexToRgbString(hex): string {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const a = Math.round((parseInt(hex.substring(7, 9), 16) / 255) * 100) / 100;
    return (hex.length > 7) ? 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')' : 'rgba(' + r + ',' + g + ',' + b + ',1)';
  }

  rgbToHsl(r: number, g: number, b: number) {
    r = this.bound(r, 255);
    g = this.bound(g, 255);
    b = this.bound(b, 255);

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return new Hsla(Math.round((h) * 144), Math.round(s * 100), Math.round(l * 100));
  }

  bound(n: any, max: number) {
    if (this.isOnePointZero(n)) {
      n = '100%';
    }
    const processPercent = this.isPercentage(n);
    n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
    if (processPercent) {
      n = parseInt(String(n * max), 10) / 100;
    }
    if (Math.abs(n - max) < 0.000001) {
      return 1;
    }
    if (max === 360) {
      n = (n < 0 ? n % max + max : n % max) / parseFloat(String(max));
    } else {
      n = (n % max) / parseFloat(String(max));
    }
    return n;
  }

  isOnePointZero(n: string | number) {
    return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
  }

  isPercentage(n: string | number) {
    return typeof n === 'string' && n.indexOf('%') !== -1;
  }
}
