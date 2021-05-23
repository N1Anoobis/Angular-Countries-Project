import { BehaviorSubject, Observable } from 'rxjs';
import { ContinentI } from 'src/typings';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ContinentsState {
  isLoading: boolean;
  continents: ContinentI[];
  error: string;
}

const initialState = {
  isLoading: false,
  continents: [],
  error: '',
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

    constructor(private http: HttpClient) {}

  getContinents() {
    const request = this.http.request('get', 'http://localhost:3000/continents');
    request.subscribe((load) =>
      this.subject.next({
        isLoading: false,
        continents: load,
        error: '',
      } as ContinentsState)
    );
  }

  // removeContinent(name: string) {
    // const continents = [];
    // this.continents.filter((item) => {
    //   if (item.name !== name) {
    //     continents.push(item);
    //   }
    // });
    // this.continents = continents;
  // }

  // addContinent(continent: ContinentI) {
  //   this.continents$
  // }
}