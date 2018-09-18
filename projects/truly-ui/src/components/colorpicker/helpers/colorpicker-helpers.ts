import {Hsla, Hsva, Rgba} from './colorpicker-formats';

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
    return (hex.length > 7) ? [r, g, b, a] : [r, g, b, 1];
  }

  hexToRgbString(hex): string {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const a = Math.round((parseInt(hex.substring(7, 9), 16) / 255) * 100) / 100;
    return (hex.length > 7) ? 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')' : 'rgba(' + r + ',' + g + ',' + b + ',1)';
  }

  public stringToHsva(colorString: string = '', allowHex8: boolean = false): Hsva | null {
    let hsva: Hsva | null = null;
    colorString = (colorString || '').toLowerCase();

    const stringParsers = [
      {
        re: /(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
        parse: (execResult: any) => {
          return new Rgba(parseInt(execResult[2], 10) / 255,
            parseInt(execResult[3], 10) / 255,
            parseInt(execResult[4], 10) / 255,
            isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
        }
      }, {
        re: /(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
        parse: ( execResult: any) => {
          return new Hsla(parseInt(execResult[2], 10) / 360,
            parseInt(execResult[3], 10) / 100,
            parseInt(execResult[4], 10) / 100,
            isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
        }
      }
    ];

    if (allowHex8) {
      stringParsers.push({
        re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})?$/,
        parse: (execResult: any) => {
          return new Rgba(parseInt(execResult[1], 16) / 255,
            parseInt(execResult[2], 16) / 255,
            parseInt(execResult[3], 16) / 255,
            parseInt(execResult[4] || 'FF', 16) / 255);
        }
      });
    } else {
      stringParsers.push({
        re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
        parse: (execResult: any) => {
          return new Rgba(parseInt(execResult[1], 16) / 255,
            parseInt(execResult[2], 16) / 255,
            parseInt(execResult[3], 16) / 255,
            1);
        }
      });
    }

    stringParsers.push({
      re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
      parse: (execResult: any) => {
        return new Rgba(parseInt(execResult[1] + execResult[1], 16) / 255,
          parseInt(execResult[2] + execResult[2], 16) / 255,
          parseInt(execResult[3] + execResult[3], 16) / 255,
          1);
      }
    });

    for (const key in stringParsers) {
      if (stringParsers.hasOwnProperty(key)) {
        const parser = stringParsers[key];
        const match = parser.re.exec(colorString), color: any = match && parser.parse(match);
        if (color) {
          if (color instanceof Rgba) {
            hsva = this.rgbaToHsva(color);
          } else if (color instanceof Hsla) {
            hsva = this.hsla2hsva(color);
          }
          return hsva;
        }
      }
    }
    return hsva;
  }

  public rgbaToHsva(rgba: Rgba): Hsva {
    let h: number, s: number;
    const r = Math.min(rgba.r, 1), g = Math.min(rgba.g, 1);
    const b = Math.min(rgba.b, 1), a = Math.min(rgba.a, 1);
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const v: number = max, d = max - min;

    s = (max === 0) ? 0 : d / max;
    if (max === min) {
      h = 0;
    } else {
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
        default:
          h = 0;
      }
      h /= 6;
    }
    return new Hsva(h, s, v, a);
  }

  public hsla2hsva(hsla: Hsla): Hsva {
    const h = Math.min(hsla.h, 1), s = Math.min(hsla.s, 1);
    const l = Math.min(hsla.l, 1), a = Math.min(hsla.a, 1);

    if (l === 0) {
      return new Hsva(h, 0, 0, a);
    } else {
      const v = l + s * (1 - Math.abs(2 * l - 1)) / 2;
      return new Hsva(h, 2 * (v - l) / v, v, a);
    }
  }

}
