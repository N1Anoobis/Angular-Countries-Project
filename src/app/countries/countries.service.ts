import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CountryI } from '../../typings';

import {countries} from './data';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private readonly subject: BehaviorSubject<CountryI[]> = new BehaviorSubject([]);
  public readonly state$: Observable<CountryI[]> = this.subject.asObservable()

  constructor() {}

  loadCountries(): void {
    this.subject.next(countries)
  }
}
