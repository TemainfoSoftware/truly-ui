import { Directive, ElementRef, OnDestroy, OnInit, Optional, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TlFilterContainer } from '../filter-container';
import { FilterService } from '../../filter.service';

const pattern = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

@Directive({
  selector: '[searchableHighlight]'
})
export class SearchableHighlightDirective implements OnInit, OnDestroy {

  constructor(@Optional() private container: TlFilterContainer,
              private filterService: FilterService,
              private sanitizer: DomSanitizer, private host: ElementRef) {
  }

  ngOnInit() {
    this.filterService.setHighlighters(this);
  }

  highlight(token: string, searchTerm: string) {
    this.host.nativeElement.innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, this.resolve(token, searchTerm));
  }

  resolve(token: string, searchTerm: string) {
    let cleanSearch = searchTerm.replace(pattern, '\\$&');
    cleanSearch = cleanSearch
      .split(' ')
      .filter(t => t.length > 0)
      .join('|');
    const regex = new RegExp(cleanSearch, 'gi');
    return cleanSearch ? token.replace(regex, match => `<span class="highlight">${match}</span>`) : token;
  }

  ngOnDestroy() {
    this.filterService.removeHighlight(this);
  }

}
