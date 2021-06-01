import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContinentI } from 'src/typings';
import { ContinentService } from '../services/continents.service';
import { ModalService, ModalState } from '../services/modal.service';

@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.scss'],
})
export class ContinentsComponent implements OnInit {
  confirmDeleteion;
  continents$: Observable<ContinentI[]> = this.continentsService.continents$;
  modalState$: Observable<ModalState> = this.modalService.state$;
  constructor(
    private continentsService: ContinentService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {}

  remove(id) {
    this.modalService.open(id);
  }
}
