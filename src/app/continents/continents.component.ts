import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContinentI } from 'src/typings';
import { ContinentService } from '../services/continents.service';
import { CountriesService } from '../services/countries.service';
import { ModalService, ModalState } from '../services/modal.service';

@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContinentsComponent implements OnInit {
  modalRespond: Record<string, unknown>;
  currentContinentId: string;
  continents$: Observable<ContinentI[]> = this.continentsService.continents$;
  modalState$: Observable<ModalState> = this.modalService.state$;
  constructor(
    private continentsService: ContinentService,
    private modalService: ModalService,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.modalState$.subscribe(
      (modalRespond) =>
        modalRespond.isConfirmed === true &&
        this.continentsService.removeContinent(this.currentContinentId)
    );
    this.countriesService.loadCountries();
  }

  initRemove(id: string): void {
    this.currentContinentId = id;
    this.modalService.open();
  }
}
