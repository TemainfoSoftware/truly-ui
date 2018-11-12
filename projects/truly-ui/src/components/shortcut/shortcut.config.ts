import {InjectionToken} from '@angular/core';

export interface ShortcutConfig {
  disableClass: string;
}

export let SHORTCUT_CONFIG = new InjectionToken<ShortcutConfig>('shortcut.config');
