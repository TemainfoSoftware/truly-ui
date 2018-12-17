import {InjectionToken} from '@angular/core';

export interface InputConfig {
  labelSize?: string;
  textAlign?: string;
  height?: string;
  flatBorder?: string;
  withBorder?: string;
  labelPlacement?: string;
  color?: string;
}

export let INPUT_CONFIG = new InjectionToken<InputConfig>('input.config');
