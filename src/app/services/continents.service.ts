import { BehaviorSubject, Observable } from 'rxjs';
import { ContinentI } from 'src/typings';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ContinentsState {
  isLoading: boolean;
  continents: ContinentI[];
  error: string;
  continentId: string;
}

const initialState = {
  isLoading: false,
  continents: [],
  error: '',
  continentId: '',
};

@Injectable({ providedIn: 'root' })
export class ContinentService {
  private readonly subject: BehaviorSubject<ContinentsState> =
    new BehaviorSubject(initialState);

  public readonly state$: Observable<ContinentsState> =
    this.subject.asObservable();

  public readonly continents$: Observable<ContinentI[]> = this.state$.pipe(
    map((state) => {
      return state.continents;
    }),
    distinctUntilChanged()
  );

  public readonly countryId$: Observable<string> = this.state$.pipe(
    map((state) => state.continentId, distinctUntilChanged())
  );

  public readonly selectedContinent$: Observable<ContinentI> = this.state$.pipe(
    map(({ continents, continentId }) =>
      continents.find((continent) => continent.name === continentId)
    ),
    distinctUntilChanged()
  );

  constructor(private http: HttpClient) {}

  getContinents() {
    const request = this.http.request(
      'get',
      'http://localhost:3000/continents'
    );
    request.subscribe((load) =>
      this.subject.next({
        isLoading: false,
        continents: load,
        error: '',
      } as ContinentsState)
    );
  }

  postContinents(data: ContinentI) {
    this.http
      .post<ContinentI>('http://localhost:3000/continents', data)
      .subscribe(() => {});
  }

  setState(callback: (state: ContinentsState) => ContinentsState): void {
    const currentState = this.subject.getValue();
    this.subject.next(callback(currentState));
  }

  addContinent(name: string): void {
    const newContinent = {
      entity: 'continent',
      id: name,
      name: name,
      area: 14200000,
      population: 4400,
      populationDensity: 0.00031,
      minHeight: 2870,
      maxHeight: 4892,
    };
    this.postContinents(newContinent);
    const callback: (state: ContinentsState) => ContinentsState = (state) => {
      return { ...state, continents: [...state.continents, newContinent] };
    };
    this.setState(callback);
  }

  removeContinent(name: string) {
    const callback: (state: ContinentsState) => ContinentsState = (state) => {
      return {
        ...state,
        continents: [
          ...state.continents.filter((continent) => continent.name !== name),
        ],
      };
    };
    this.setState(callback);
    this.deleteContinent(name);
  }

  deleteContinent(name: string) {
    this.http
      .delete(`http://localhost:3000/continents/${name}`)
      .subscribe(() => {});
  }

  setContinentId(id: string): void {
    const callback: (state: ContinentsState) => ContinentsState = (state) => {
      return { ...state, continentId: id };
    };
    this.setState(callback);
  }
}
