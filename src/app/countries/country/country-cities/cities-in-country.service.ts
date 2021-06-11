import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { CitiesService } from 'src/app/services/cities.service';
import { CountriesService } from 'src/app/services/countries.service';
import { CityI } from 'src/typings';
import Sorting from '../../../shared/utils/sorting.class';
import CitiesInCountryStateUpdate from './cities-in-country.class';

interface CitiesInCountryState {
  cities: CityI[] | null;
  citiesPage: CityI[] | null;
  itemsPerPage: number;
  currentPage: number;
  pagesCount: number;
  sortingPerColumn: string;
  sortingOrder: 'ascending' | 'descending';
}

type Callback = (state: CitiesInCountryState) => CitiesInCountryState;

const InitialState: CitiesInCountryState = {
  cities: null,
  citiesPage: null,
  itemsPerPage: 5,
  currentPage: 1,
  pagesCount: 1,
  sortingPerColumn: 'name',
  sortingOrder: 'ascending',
};

@Injectable({
  providedIn: 'root',
})
export class CitiesInCountryService {
  constructor(
    private countriesService: CountriesService,
    private citiesService: CitiesService
  ) {}

  private subject: BehaviorSubject<CitiesInCountryState> = new BehaviorSubject(
    InitialState
  );

  public readonly state$: Observable<CitiesInCountryState> =
    this.subject.asObservable();

  public readonly citiesPage$: Observable<CityI[]> = this.state$.pipe(
    map((state) => {
      return state.citiesPage;
    }),
    distinctUntilChanged()
  );

  public readonly currentPage$: Observable<number> = this.state$.pipe(
    map((state) => {
      return state.currentPage;
    }),
    distinctUntilChanged()
  );

  public readonly pagesCount$: Observable<number> = this.state$.pipe(
    map((state) => {
      return state.pagesCount;
    }),
    distinctUntilChanged()
  );

  public readonly sortingPerColumn$: Observable<string> = this.state$.pipe(
    map((state) => {
      return state.sortingPerColumn;
    }),
    distinctUntilChanged()
  );

  public readonly sortingOrder$: Observable<string> = this.state$.pipe(
    map((state) => {
      return state.sortingOrder;
    }),
    distinctUntilChanged()
  );

  private setState(callback: Callback): void {
    const currentState = this.subject.getValue();
    this.subject.next(callback(currentState));
  }

  public setStateParams(params: Partial<CitiesInCountryState>): void {
    const callback: Callback = (state) => {
      return { ...state, ...params };
    };
    this.setState(callback);
  }

  public readonly citiesInCountry$: Observable<CityI[]> = combineLatest([
    this.countriesService.countryId$,
    this.citiesService.cities$,
  ]).pipe(
    filter(([countryId, cities]) => {
      if (countryId === '') return false;
      if (cities.length === 0) return false;
      return true;
    }),
    map(([countryId, cities]) => {
      const citiesCopy = cities.map((city) => ({ ...city }));
      const filtered = citiesCopy.filter(
        (city) => city.countryId === countryId
      );
      return filtered;
    }, distinctUntilChanged())
  );

  public loadCitiesPage(params: Partial<CitiesInCountryState>): void {
    this.setStateParams(params);
    this.citiesInCountry$
      .pipe(
        map((cities) => {
          const currentState = this.subject.getValue();

          const { itemsPerPage, currentPage, sortingPerColumn, sortingOrder } =
            currentState;

          let citiesSorted: CityI[];
          if (sortingOrder === 'ascending') {
            citiesSorted = [...cities].sort((a, b) =>
              Sorting.ascending(a, b, sortingPerColumn)
            );
          }
          if (sortingOrder === 'descending') {
            citiesSorted = [...cities].sort((a, b) =>
              Sorting.descending(a, b, sortingPerColumn)
            );
          }

          return CitiesInCountryStateUpdate.getCitiesStateUpdateData(
            citiesSorted,
            currentPage,
            itemsPerPage
          );
        })
      )
      .subscribe((data) => {
        this.setStateParams(data);
      });
  }
}
