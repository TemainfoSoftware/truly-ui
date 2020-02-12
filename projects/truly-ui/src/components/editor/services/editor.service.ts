import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {TagContent} from '../interfaces/tag-content';
import {FieldContent} from '../interfaces/field-content';

@Injectable()
export class EditorService {

  public compileSuject = new Subject();

  constructor(private domSanitizer: DomSanitizer) {
  }

  decompile(html: string, tagsContent: TagContent[], fieldsContent: FieldContent[]) {
    const htmlParsed = new DOMParser().parseFromString(html, 'text/html');
    return new Promise((resolve) => {
      const tagsDom = [];
      const fieldsDom = [];
      tagsContent.forEach((item) => {
        tagsDom.push({
          id: item.tag,
          value: item.value,
          element: htmlParsed.getElementById(item.tag),
        });
      });
      fieldsContent.forEach((item) => {
        fieldsDom.push({
          id: item.field,
          value: item.value,
          element: htmlParsed.getElementById(item.field),
        });
      });
      for (let i = 0; i < tagsDom.length; i++) {
        if (tagsDom[i].element) {
          const element = new DOMParser()
            .parseFromString(`<span id="${tagsDom[i].id}" class="ui-hashtag">${tagsDom[i].id}</span>`, 'text/html').body.firstChild;
          tagsDom[i].element.insertAdjacentElement('afterend', <Element>element);
          tagsDom[i].element.remove();
        }
      }
      for (let i = 0; i < fieldsDom.length; i++) {
        if (fieldsDom[i].element) {
          const element = new DOMParser()
            .parseFromString(`<input id="${fieldsDom[i].id}" class="ui-field" value="${this.getFieldValue(fieldsDom[i])}">`,
              'text/html').body.firstChild;
          fieldsDom[i].element.insertAdjacentElement('afterend', <Element>element);
          fieldsDom[i].element.remove();
        }
      }
      resolve(this.domSanitizer.bypassSecurityTrustHtml(htmlParsed.body.innerHTML));
    });
  }

  private getFieldValue( field ) {
    if ( field.element.innerText ) {
      return field.element.innerText;
    }
    return field.value || '';
  }

  compile(html: string, tagsContent: TagContent[], fieldsContent: FieldContent[]) {
    const htmlParsed = new DOMParser().parseFromString(html, 'text/html').body;
    return new Promise((resolve) => {
      const tags = htmlParsed.querySelectorAll('.ui-hashtag');
      for (let i = 0; i < tags.length; i++) {
        const tagSelected = tagsContent.find(item => item.tag === this.getAttributeValue(tags[i].attributes, 'id'));
        if (tagSelected) {
          const element = new DOMParser()
            .parseFromString(`<strong id="${tagSelected.tag}">${tagSelected.value}</strong>`, 'text/html').body.firstChild;
          tags[i].insertAdjacentElement('afterend', <Element>element);
          tags[i].remove();
        }
      }
      const fields = htmlParsed.querySelectorAll('.ui-field');
      for (let i = 0; i < fields.length; i++) {
        const fieldSelected = fieldsContent.find(item => item.field === this.getAttributeValue(fields[i].attributes, 'id'));
        const fieldValue = this.getAttributeValue(fields[i].attributes, 'value');
        const element = new DOMParser()
          .parseFromString(`<strong id="${fieldSelected.field}">${fieldValue}</strong>`, 'text/html').body.firstChild;
        fields[i].insertAdjacentElement('afterend', <Element>element);
        fields[i].remove();
      }
      resolve(this.domSanitizer.bypassSecurityTrustHtml(htmlParsed.innerHTML));
    });
  }

  private getAttributeValue(attributes, name) {
    for (let i = 0; i < attributes.length; i++) {
      if (attributes[i].name === name) {
        return attributes[i].value;
      }
    }
  }
}

