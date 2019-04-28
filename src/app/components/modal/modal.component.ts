import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateMusicComponent } from '../create-music/create-music.component';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';

@Component({
  selector: 'ngbd-modal-component',
  template: `<div></div>`,
  styleUrls: ['modal.component.less']
})
export class NgbdModalComponent {

  @Input() gridInst: any;

  @Output() musicSubmitted: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal) {}

  /**
   * Open modal with component as content.
   */
  open() {
    const modalRef = this.modalService.open(CreateMusicComponent);

    modalRef.componentInstance.parent = this.gridInst;
  }
}
