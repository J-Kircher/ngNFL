import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { JQUERY_TOKEN } from './jQuery.service';

@Component({
  selector: 'simple-modal',
  template: `
    <div id="{{elementId}}" #modalContainer class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
            <h4 class="modal-title">{{modalTitle}}</h4>
          </div>
          <div class="modal-body" (click)="closeModal()">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-content { border-radius: 10px; overflow: hidden; background: url(/assets/images/whiteback.gif); }
    `]
})

export class SimpleModalComponent {
  @Input() modalTitle: string;
  @Input() elementId: string;
  @Input() closeOnBodyClick: string;
  @ViewChild('modalContainer') containerEl: ElementRef;

  constructor(@Inject(JQUERY_TOKEN) private $: any) { }

  closeModal() {
    if (this.closeOnBodyClick === 'true') {
      // console.log('[simple-modal] closeModal()');
      this.$(this.containerEl.nativeElement).modal('hide');
    }
  }
}
