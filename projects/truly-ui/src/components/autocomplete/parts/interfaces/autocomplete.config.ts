import {InjectionToken} from '@angular/core';

export interface AutoCompleteConfig {
  labelSize?: string;
  textAlign?: string;
  height?: string;
  flatBorder?: string;
  withBorder?: string;
  labelPlacement?: string;
  color?: string;
}

export let AUTOCOMPLETE_CONFIG = new InjectionToken<AutoCompleteConfig>('autocomplete.config');
