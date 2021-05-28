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

  public readonly continentsList$: Observable<{ name: string; id: string }[]> =
    this.state$.pipe(
      map(({ continents }) =>
        continents.map((continent) => {
          return {
            name: continent.name,
            id: continent.id,
          };
        })
      ),
      distinctUntilChanged()
    );

  constructor(private http: HttpClient) {}

  setState(callback: (state: ContinentsState) => ContinentsState): void {
    const currentState = this.subject.getValue();
    this.subject.next(callback(currentState));
  }

  setContinentId(id: string): void {
    const callback: (state: ContinentsState) => ContinentsState = (state) => {
      return { ...state, continentId: id };
    };
    this.setState(callback);
  }

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

  addContinent(newContinent: ContinentI): void {
    this.postContinents(newContinent);
    const callback: (state: ContinentsState) => ContinentsState = (state) => {
      return { ...state, continents: [...state.continents, newContinent] };
    };
    this.setState(callback);
  }

  postContinents(data: ContinentI) {
    this.http
      .post<ContinentI>('http://localhost:3000/continents', data)
      .subscribe(() => {});
  }

  removeContinent(id: string) {
    const callback: (state: ContinentsState) => ContinentsState = (state) => {
      return {
        ...state,
        continents: [
          ...state.continents.filter((continent) => continent.id !== id),
        ],
      };
    };
    this.setState(callback);
    this.deleteContinent(id);
  }

  deleteContinent(id: string) {
    this.http
      .delete(`http://localhost:3000/continents/${id}`)
      .subscribe(() => {});
  }

  editContinent(newContinent: ContinentI): void {
    this.putContinent(newContinent);
    const callback: (state: ContinentsState) => ContinentsState = (state) => {
      return {
        ...state,
        continents: [
          ...state.continents.map((continent) =>
            continent.id === newContinent.id ? newContinent : continent
          ),
        ],
      };
    };
    this.setState(callback);
  }

  putContinent(data: ContinentI) {
    this.http
      .put(`http://localhost:3000/continents/${data.id}`, data)
      .subscribe(() => {});
  }
}
