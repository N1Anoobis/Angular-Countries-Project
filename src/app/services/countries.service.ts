import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CountryI } from '../../typings';
import { distinctUntilChanged, map } from 'rxjs/operators';

export interface CountriesState {
  isLoading: boolean;
  countries: CountryI[];
  error: string;
}

const initialState: CountriesState = {
  isLoading: false,
  countries: [],
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
  constructor(private http: HttpClient) {}

  loadCountries(): void {
    const request = this.http.request('get', 'http://localhost:3000/countries');
    request.subscribe((load) =>
      this.subject.next({
        isLoading: false,
        countries: load,
        error: '',
      } as CountriesState)
    );
  }
}
