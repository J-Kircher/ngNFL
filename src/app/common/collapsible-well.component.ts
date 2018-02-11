import { Component } from '@angular/core';

@Component({
  selector: 'collapsible-well',
  template: `
    <div (click)="toggleContent()" class="pointable">
      <ng-content select="[well-title]"></ng-content>
      <ng-content *ngIf="visible" select="[well-body]"></ng-content>
    </div>
  `
})

export class CollapsibleWellComponent {
  visible: boolean = false;

  toggleContent() {
    this.visible = !this.visible;
  }
}
