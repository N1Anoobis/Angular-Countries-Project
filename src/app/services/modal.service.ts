import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { ContinentService } from './continents.service';

export interface ModalState {
  id: string;
  display: 'close' | 'open';
}

const initialState: ModalState = {
  id: '',
  display: 'close',
};

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private display: BehaviorSubject<ModalState> = new BehaviorSubject(
    initialState
  );
  readonly state$: Observable<ModalState> = this.display.asObservable();

  constructor(private continentsServives: ContinentService) {}

  watch(): Observable<ModalState> {
    return this.display.asObservable();
  }

  open(id) {
    this.display.next({
      id: id,
      display: 'open',
    });
  }

  close() {
    this.display.next({
      id: '',
      display: 'close',
    });
  }

  confirmDeletion() {
    const currentState = this.display.getValue();
    this.continentsServives.removeContinent(currentState.id);
    this.display.next({
      id: '',
      display: 'close',
    });
  }
}
