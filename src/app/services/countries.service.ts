import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CountryI } from '../../typings';
import {
  distinctUntilChanged,
  map,
} from 'rxjs/operators';

export interface CountriesState {
  isLoading: boolean;
  countries: CountryI[];
  countryId: string;
  error: string;
}

const initialState: CountriesState = {
  isLoading: false,
  countries: [],
  countryId: '',
  error: '',
};

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private readonly subject: BehaviorSubject<CountriesState> =
    new BehaviorSubject(initialState);

  public readonly state$: Observable<CountriesState> =
    this.subject.asObservable();

  public readonly countries$: Observable<CountryI[]> = this.state$.pipe(
    map((state) => {
      return state.countries;
    }),
    distinctUntilChanged()
  );

  public readonly countryId$: Observable<string> = this.state$.pipe(
    map((state) => state.countryId, distinctUntilChanged())
  );

  public readonly selectedCountry$: Observable<CountryI> = this.state$.pipe(
    map(({countries, countryId}) => countries.find((country) => country.id === countryId)),
    distinctUntilChanged()
  );

  constructor(private http: HttpClient) {}

  loadCountries(): void {
    const request$ = this.http.request('get', 'http://localhost:3000/countries');
    request$.subscribe((load) =>
      this.subject.next({
        isLoading: false,
        countries: load,
        countryId: '',
        error: '',
      } as CountriesState)
    );
  }

  setState(callback: (state: CountriesState) => CountriesState): void {
    const currentState = this.subject.getValue();
    this.subject.next(callback(currentState));
  }

  setCountryId(id: string): void {
    const callback: (state: CountriesState) => CountriesState = (state) => {
      return { ...state, countryId: id };
    };
    this.setState(callback);
  }
}
