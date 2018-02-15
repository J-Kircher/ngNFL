import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { JQUERY_TOKEN } from './jQuery.service';

@Directive({
  selector: '[modal-trigger]'
})

export class ModalTriggerDirective implements OnInit {
  private hostElement: HTMLElement;
  @Input('modal-trigger') modalId: string;

  constructor(ref: ElementRef, @Inject(JQUERY_TOKEN) private $: any) {
    this.hostElement = ref.nativeElement;
  }

  ngOnInit() {
    // console.log('[modal-trigger] ngOnInit() modalId:' + this.modalId);
    this.hostElement.addEventListener('click', e => {
      this.openModal();
    })
  }

  openModal() {
    // console.log('[modal-trigger] openModal()');
    this.$(`#${this.modalId}`).modal({});
  }
}
