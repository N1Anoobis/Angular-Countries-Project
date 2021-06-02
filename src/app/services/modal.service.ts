import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { ContinentService } from './continents.service';

export interface ModalState {
  isConfirmed: boolean;
  display: 'close' | 'open';
}

const initialState: ModalState = {
  isConfirmed: false,
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

  watch(): Observable<ModalState> {
    return this.display.asObservable();
  }

  open() {
    this.display.next({
      isConfirmed: false,
      display: 'open',
    });
  }

  close() {
    this.display.next({
      isConfirmed: false,
      display: 'close',
    });
  }

  confirmDeletion(arg: boolean) {
    this.display.next({
      isConfirmed: arg,
      display: 'close',
    });
  }
}
