import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as json from './editordemo-dataproperties.json';
import * as jsonEvents from './editordemo-dataevents.json';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {TlEditor} from '../../../../projects/truly-ui/src/components/editor/editor';

@Component({
  selector: 'app-editordemo',
  templateUrl: './editordemo.component.html',
  styleUrls: ['./editordemo.component.scss']
})
export class EditorDemoComponent implements OnInit {


  @ViewChild(TlEditor, {static: true}) editor: TlEditor;

  public dataTableProperties;

  public dataEvents;

  public disabled = false;

  public config = {

    font: {
      family: { show: true, tooltipText: 'Font family' }
    }

  };

  public form: UntypedFormGroup = new UntypedFormGroup({
    editor: new UntypedFormControl('TESTE')
  });

  public textTemplate = '<div>Declaro para fins de ausência escolar, a pedido, do responsável legal, que o sr.(a)\n' +
    '  <span class="ui-hashtag" id="#nome_paciente" contenteditable="false">#nome_paciente</span>, inscrito no CPF sob nº&nbsp;\n' +
    '  <span class="ui-hashtag" id="#cpf" contenteditable="false">#cpf</span> , paciente sob meus cuidados, foi atendido (a)\n' +
    '  na data&nbsp;\n' +
    '  <span class="ui-hashtag" id="#dt_atendimento" contenteditable="false">#dt_atendimento</span>&nbsp;, as&nbsp;\n' +
    '  <span class="ui-hashtag" id="#hora" contenteditable="false">#hora</span> , necessitando ficar afastado(a) de suas\n' +
    '  atividades escolares pelo período de&nbsp;\n' +
    '  <input type="text" value="" class="ui-field" id="$periodo" placeholder="">&nbsp;dias a partir da presente data.\n' +
    '</div>';

  constructor( private cd: ChangeDetectorRef ) {
    this.dataTableProperties = json.dataProperties;
    this.dataEvents = jsonEvents.dataProperties;
    setTimeout(() => {
      this.form.get('editor').patchValue( this.textTemplate,
        { onlySelf: true, emitEvent: false });
      this.cd.detectChanges();
    }, 4000);
  }

  ngOnInit() {

  }

  saveContent( $event ) {
    console.log($event);
    this.disabled = true;
    setTimeout(() => {
      this.disabled = false;
      this.cd.detectChanges();
      this.editor.setContentFocus();
    }, 6000);
  }

}
