import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { CityI, CountryI } from 'src/typings';
import { ContinentService } from './continents.service';

export interface CitiesState {
  isLoading: boolean;
  cities: CityI[];
  error: string;
  cityId: string;
}

const initialState: CitiesState = {
  isLoading: false,
  cities: [],
  error: '',
  cityId: '',
};

@Injectable({ providedIn: 'root' })
export class CitiesService {
  private readonly subject: BehaviorSubject<CitiesState> = new BehaviorSubject(
    initialState
  );
  readonly state$: Observable<CitiesState> = this.subject.asObservable();
  readonly cities$: Observable<CityI[]> = this.state$.pipe(
    map((state) => state.cities),
    distinctUntilChanged()
  );

  public readonly cityId$: Observable<string> = this.state$.pipe(
    map((state) => state.cityId, distinctUntilChanged())
  );

  public readonly selectedCity$: Observable<CityI> = this.state$.pipe(
    map(({ cities, cityId }) => cities.find((city) => city.id === cityId)),
    distinctUntilChanged()
  );

  // public readonly countrysInContinent$: Observable<CountryI> = combineLatest([
  //   this.state$,
  //   this.continentsService.continents$,
  // ]).pipe(
  //   map(([state, continents]) => {
  //     const country = state.cities.filter(
  //       (country) => country.continent === state.countryId
  //     );
  //     const continentName = continents.find(
  //       (continent) => continent.id === country.continent
  //     )?.name;
  //     return { ...country, continent: continentName };
  //   }, distinctUntilChanged())
  // );

  constructor(private http: HttpClient,
    private continentsService:ContinentService) {}

  loadCities(): void {
    const request = this.http.request('get', 'http://localhost:3000/cities');
    request.subscribe((data) =>
      this.subject.next({
        isLoading: false,
        cities: data,
        error: '',
      } as CitiesState)
    );
  }

  setState(callback: (state: CitiesState) => CitiesState): void {
    const currentState = this.subject.getValue();
    this.subject.next(callback(currentState));
  }

  setCityId(id: string): void {
    const callback: (state: CitiesState) => CitiesState = (state) => {
      return { ...state, cityId: id };
    };
    this.setState(callback);
  }

  addCity(newCity: CityI): void {
    this.postcities(newCity);
    const callback: (state: CitiesState) => CitiesState = (state) => {
      return { ...state, cities: [...state.cities, newCity] };
    };
    this.setState(callback);
  }

  postcities(data: CityI) {
    this.http
      .post<CityI>('http://localhost:3000/cities', data)
      .subscribe(() => {});
  }

  editCity(newCity: CityI): void {
    this.putCity(newCity);
    const callback: (state: CitiesState) => CitiesState = (state) => {
      return {
        ...state,
        cities: [
          ...state.cities.map((city) =>
            city.id === newCity.id ? newCity : city
          ),
        ],
      };
    };
    this.setState(callback);
  }

  putCity(data: CityI) {
    this.http
      .put(`http://localhost:3000/cities/${data.id}`, data)
      .subscribe(() => {});
  }

  removeCity(id: string) {
    const callback: (state: CitiesState) => CitiesState = (state) => {
      return {
        ...state,
        cities: [
          ...state.cities.filter((city) => city.id !== id),
        ],
      };
    };
    this.setState(callback);
    this.deleteCity(id);
  }

  deleteCity(id: string) {
    console.log(id)
    this.http
      .delete(`http://localhost:3000/cities/${id}`)
      .subscribe(() => {});
  }
}
