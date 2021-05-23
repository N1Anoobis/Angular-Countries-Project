import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { CityI } from 'src/typings';

export interface CitiesState {
  isLoading: boolean;
  cities: CityI[];
  error: string;
}

const initialState: CitiesState = {
  isLoading: false,
  cities: [],
  error: '',
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

  constructor(private http: HttpClient) {}

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
}
