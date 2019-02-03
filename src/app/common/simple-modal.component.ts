import { Component, Input, ViewChild  } from '@angular/core';

@Component({
  selector: 'simple-modal',
  template: `
    <div id="{{elementId}}" bsModal #childModal="bs-modal" class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" (click)="hide()"><span>&times;</span></button>
            <h4 class="modal-title">{{modalTitle}}</h4>
          </div>
          <div class="modal-body">
            <ng-content></ng-content>
          </div>
          <div class="modal-footer">
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

  constructor() { }

  show() {
    // this.childModal.show();
  }

  hide() {
    // this.childModal.hide();
  }
}
