/*
  MIT License

  Copyright (c) 2019 Temainfo Software

  Permissis hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentatfiles (the "Software"), to deal
  in the Software without restriction, including without limitatthe rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  The above copyright notice and this permissnotice shall be included in all
  copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTOF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTWITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/
import { Component, ElementRef, ViewChild } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import {FixedPositionDirective} from '../../../../../projects/truly-ui/src/components/misc/fixed-position.directive';

@Component( {
  selector : 'app-icons',
  templateUrl : './iconsdemo.component.html',
  styleUrls : [ './iconsdemo.component.scss' ],
  animations: [
    trigger(
      'enterAnimation', [
        transition( ':enter', [
          style( { opacity: 0 } ),
          animate( '250ms', style( { opacity: 1 } ) )
        ] ),
        transition( ':leave', [
          style( { opacity: 1 } ),
          animate( '250ms', style( { opacity: 0 } ) )
        ] )
      ]
    )
  ]
} )
export class IconsDemoComponent {

  @ViewChild('inputCopy', {static: false}) inputCopy: ElementRef<any>;

  public filter;

  public cheatsheet = false;

  public copy: string;

  public saved: string;

  public interval;

  public outputIcon;

  public materialIcons = ['add-circle-outline', 'add-circle', 'add', 'airplane',
    'alarm', 'albums', 'alert', 'american-football', 'analytics',
    'aperture', 'apps', 'appstore', 'archive', 'arrow-back', 'arrow-down',
    'arrow-dropdown-circle', 'arrow-dropdown', 'arrow-dropleft-circle', 'arrow-dropleft',
    'arrow-dropright-circle', 'arrow-dropright', 'arrow-dropup-circle', 'arrow-dropup',
    'arrow-forward', 'arrow-round-back', 'arrow-round-down', 'arrow-round-forward',
    'arrow-round-up', 'arrow-up', 'at', 'attach', 'backspace', 'barcode',
    'baseball', 'basket', 'basketball', 'battery-charging', 'battery-dead',
    'battery-full', 'beaker', 'bed', 'beer', 'bicycle', 'bluetooth',
    'boat', 'body', 'bonfire', 'book', 'bookmark', 'bookmarks',
    'bowtie', 'briefcase', 'browsers', 'brush', 'bug', 'build',
    'bulb', 'bus', 'business', 'cafe', 'calculator', 'calendar',
    'call', 'camera', 'car', 'card', 'cart', 'cash',
    'cellular', 'chatboxes', 'chatbubbles', 'checkbox-outline', 'checkbox',
    'checkmark-circle-outline', 'checkmark-circle', 'checkmark', 'clipboard',
    'clock', 'close-circle-outline', 'close-circle', 'close', 'cloud-circle',
    'cloud-done', 'cloud-download', 'cloud-outline', 'cloud-upload', 'cloud',
    'cloudy-night', 'cloudy', 'code-download', 'code-working', 'code',
    'cog', 'color-fill', 'color-filter', 'color-palette', 'color-wand',
    'compass', 'construct', 'contact', 'contacts', 'contract', 'contrast',
    'copy', 'create', 'crop', 'cube', 'cut', 'desktop', 'disc',
    'document', 'done-all', 'download', 'easel', 'egg', 'exit',
    'expand', 'eye-off', 'eye', 'fastforward', 'female', 'filing',
    'film', 'finger-print', 'fitness', 'flag', 'flame', 'flash-off',
    'flash', 'flashlight', 'flask', 'flower', 'folder-open', 'folder',
    'football', 'funnel', 'gift', 'git-branch', 'git-commit',
    'git-compare', 'git-merge', 'git-network', 'git-pull-request', 'glasses',
    'globe', 'grid', 'hammer', 'hand', 'happy', 'headset',
    'heart', 'heart-dislike', 'heart-empty', 'heart-half', 'help-buoy',
    'help-circle-outline', 'help-circle', 'help', 'home', 'hourglass',
    'ice-cream', 'image', 'images', 'infinite', 'information-circle-outline',
    'information-circle', 'information', 'jet', 'journal', 'key',
    'keypad', 'laptop', 'leaf', 'link', 'list-box', 'list',
    'locate', 'lock', 'log-in', 'log-out', 'magnet', 'mail-open',
    'mail-unread', 'mail', 'male', 'man', 'map', 'medal',
    'medical', 'medkit', 'megaphone', 'menu', 'mic-off', 'mic',
    'microphone', 'moon', 'more', 'move', 'musical-note', 'musical-notes',
    'navigate', 'notifications-off', 'notifications-outline', 'notifications',
    'nuclear', 'nutrition', 'open', 'options', 'outlet', 'paper-plane',
    'paper', 'partly-sunny', 'pause', 'paw', 'people', 'person-add',
    'person', 'phone-landscape', 'phone-portrait', 'photos', 'pie', 'pin',
    'pint', 'pizza', 'planet', 'play-circle', 'play', 'podium',
    'power', 'pricetag', 'pricetags', 'print', 'pulse', 'qr-scanner',
    'quote', 'radio-button-off', 'radio-button-on', 'radio', 'rainy',
    'recording', 'redo', 'refresh-circle', 'refresh', 'remove-circle-outline',
    'remove-circle', 'remove', 'reorder', 'repeat', 'resize',
    'restaurant', 'return-left', 'return-right', 'reverse-camera', 'rewind',
    'ribbon', 'rocket', 'rose', 'sad', 'save', 'school',
    'search', 'send', 'settings', 'share-alt', 'share', 'shirt',
    'shuffle', 'skip-backward', 'skip-forward', 'snow', 'speedometer',
    'square-outline', 'square', 'star-half', 'star-outline', 'star',
    'stats', 'stopwatch', 'subway', 'sunny', 'swap', 'switch',
    'sync', 'tablet-landscape', 'tablet-portrait', 'tennisball', 'text',
    'thermometer', 'thumbs-down', 'thumbs-up', 'thunderstorm', 'time',
    'timer', 'today', 'train', 'transgender', 'trash', 'trending-down',
    'trending-up', 'trophy', 'tv', 'umbrella', 'undo', 'unlock',
    'videocam', 'volume-high', 'volume-low', 'volume-mute', 'volume-off',
    'wallet', 'walk', 'warning', 'watch', 'water', 'wifi',
    'wine', 'woman'];

  public iosIcons = ['add-circle-outline', 'add-circle', 'add', 'airplane',
    'alarm', 'albums', 'alert', 'american-football', 'analytics',
    'aperture', 'apps', 'appstore', 'archive', 'arrow-back',
    'arrow-down', 'arrow-dropdown-circle', 'arrow-dropdown', 'arrow-dropleft-circle',
    'arrow-dropleft', 'arrow-dropright-circle', 'arrow-dropright', 'arrow-dropup-circle',
    'arrow-dropup', 'arrow-forward', 'arrow-round-back', 'arrow-round-down',
    'arrow-round-forward', 'arrow-round-up', 'arrow-up', 'at', 'attach',
    'backspace', 'barcode', 'baseball', 'basket', 'basketball',
    'battery-charging', 'battery-dead', 'battery-full', 'beaker', 'bed',
    'beer', 'bicycle', 'bluetooth', 'boat', 'body', 'bonfire',
    'book', 'bookmark', 'bookmarks', 'bowtie', 'briefcase',
    'browsers', 'brush', 'bug', 'build', 'bulb', 'bus',
    'business', 'cafe', 'calculator', 'calendar', 'call', 'camera',
    'car', 'card', 'cart', 'cash', 'cellular', 'chatboxes',
    'chatbubbles', 'checkbox-outline', 'checkbox', 'checkmark-circle-outline',
    'checkmark-circle', 'checkmark', 'clipboard', 'clock',
    'close-circle-outline', 'close-circle', 'close', 'cloud-circle',
    'cloud-done', 'cloud-download', 'cloud-outline', 'cloud-upload',
    'cloud', 'cloudy-night', 'cloudy', 'code-download', 'code-working',
    'code', 'cog', 'color-fill', 'color-filter', 'color-palette',
    'color-wand', 'compass', 'construct', 'contact', 'contacts',
    'contract', 'contrast', 'copy', 'create', 'crop', 'cube',
    'cut', 'desktop', 'disc', 'document', 'done-all', 'download',
    'easel', 'egg', 'exit', 'expand', 'eye-off', 'eye',
    'fastforward', 'female', 'filing', 'film', 'finger-print',
    'fitness', 'flag', 'flame', 'flash-off', 'flash', 'flashlight',
    'flask', 'flower', 'folder-open', 'folder', 'football',
    'funnel', 'gift', 'git-branch', 'git-commit', 'git-compare',
    'git-merge', 'git-network', 'git-pull-request', 'glasses', 'globe',
    'grid', 'hammer', 'hand', 'happy', 'headset', 'heart',
    'heart-dislike', 'heart-empty', 'heart-half', 'help-buoy',
    'help-circle-outline', 'help-circle', 'help', 'home', 'hourglass',
    'ice-cream', 'image', 'images', 'infinite', 'information-circle-outline',
    'information-circle', 'information', 'jet', 'journal', 'key',
    'keypad', 'laptop', 'leaf', 'link', 'list-box', 'list',
    'locate', 'lock', 'log-in', 'log-out', 'magnet', 'mail-open',
    'mail-unread', 'mail', 'male', 'man', 'map', 'medal',
    'medical', 'medkit', 'megaphone', 'menu', 'mic-off', 'mic',
    'microphone', 'moon', 'more', 'move', 'musical-note',
    'musical-notes', 'navigate', 'notifications-off', 'notifications-outline',
    'notifications', 'nuclear', 'nutrition', 'open', 'options',
    'outlet', 'paper-plane', 'paper', 'partly-sunny', 'pause',
    'paw', 'people', 'person-add', 'person', 'phone-landscape',
    'phone-portrait', 'photos', 'pie', 'pin', 'pint', 'pizza',
    'planet', 'play-circle', 'play', 'podium', 'power', 'pricetag',
    'pricetags', 'print', 'pulse', 'qr-scanner', 'quote',
    'radio-button-off', 'radio-button-on', 'radio', 'rainy', 'recording',
    'redo', 'refresh-circle', 'refresh', 'remove-circle-outline',
    'remove-circle', 'remove', 'reorder', 'repeat', 'resize',
    'restaurant', 'return-left', 'return-right', 'reverse-camera', 'rewind',
    'ribbon', 'rocket', 'rose', 'sad', 'save', 'school',
    'search', 'send', 'settings', 'share-alt', 'share', 'shirt',
    'shuffle', 'skip-backward', 'skip-forward', 'snow', 'speedometer',
    'square-outline', 'square', 'star-half', 'star-outline', 'star',
    'stats', 'stopwatch', 'subway', 'sunny', 'swap', 'switch',
    'sync', 'tablet-landscape', 'tablet-portrait', 'tennisball', 'text',
    'thermometer', 'thumbs-down', 'thumbs-up', 'thunderstorm', 'time',
    'timer', 'today', 'train', 'transgender', 'trash',
    'trending-down', 'trending-up', 'trophy', 'tv', 'umbrella',
    'undo', 'unlock', 'videocam', 'volume-high', 'volume-low',
    'volume-mute', 'volume-off', 'wallet', 'walk', 'warning',
    'watch', 'water', 'wifi', 'wine', 'woman'];

  public logoIcons = ['android', 'angular', 'apple', 'bitbucket',
    'bitcoin', 'buffer', 'chrome', 'closed-captioning', 'codepen',
    'css3', 'designernews', 'dribbble', 'dropbox', 'euro',
    'facebook', 'flickr', 'foursquare', 'freebsd-devil',
    'game-controller-a', 'game-controller-b', 'github', 'google',
    'googleplus', 'hackernews', 'html5', 'instagram', 'ionic',
    'ionitron', 'javascript', 'linkedin', 'markdown', 'model-s',
    'no-smoking', 'nodejs', 'npm', 'octocat', 'pinterest',
    'playstation', 'polymer', 'python', 'reddit', 'rss',
    'sass', 'skype', 'slack', 'snapchat', 'steam', 'tumblr',
    'tux', 'twitch', 'twitter', 'usd', 'vimeo', 'vk',
    'whatsapp', 'windows', 'wordpress', 'xbox', 'xing',
    'yahoo', 'yen', 'youtube'];

  constructor() {}

  filterIcon(array) {
    if ( array.length === 0 || this.filter === undefined || this.filter.trim() === '' ) {
      return array;
    }

    return array.filter( (v) => v.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0 );
  }

  toggleCheatsheet() {
    this.cheatsheet = !this.cheatsheet;
  }

  copyIcon(icon, styleIcon) {
    this.onMouseLeave();
    if ( this.cheatsheet ) {
      this.outputIcon = `ion ion-${ styleIcon }-${ icon }`;
    } else {
      this.outputIcon = `<tl-icon [lib]="'ion'" [style]="'${ styleIcon }'">${ icon }</tl-icon>`;
    }
    setTimeout(() => {
      this.inputCopy.nativeElement.select();
      document.execCommand('copy');
      this.showCopyMessage(icon);
    });
  }

  showCopyMessage(icon) {
    this.saved = icon;
    clearInterval( this.interval );
    this.interval = setInterval( () => {
      this.saved = '';
    }, 1000 );
  }

  onMouseOver(icon) {
    this.copy = icon;
  }

  onMouseLeave() {
    this.copy = '';
  }

}

