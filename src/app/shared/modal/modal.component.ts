import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ModalService, ModalState } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  display$: Observable<ModalState>;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.display$ = this.modalService.watch();
  }

  close() {
    this.modalService.close();
  }

  confirmDeletion() {
    this.modalService.confirmDeletion();
  }
}
