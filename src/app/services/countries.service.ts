import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CountryI } from '../../typings';
import { distinctUntilChanged, map } from 'rxjs/operators';

export interface CountriesState {
  isLoading: boolean;
  countries: CountryI[];
  countryId: string;
  error: string;
}

type Callback = (state: CountriesState) => CountriesState;

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
    map(({ countries, countryId }) =>
      countries.find((country) => country.id === countryId)
    ),
    distinctUntilChanged()
  );

  public get selectedCountry(): CountryI {
    const countryId: string = this.subject.getValue().countryId;
    return this.subject
      .getValue()
      .countries.find((country) => country.id === countryId);
  }

  constructor(private http: HttpClient) {}

  setState(callback: Callback): void {
    const currentState = this.subject.getValue();
    this.subject.next(callback(currentState));
  }

  setCountryId(id: string): void {
    const callback: Callback = (state) => {
      return { ...state, countryId: id };
    };
    this.setState(callback);
  }

  loadCountries(): void {
    const request$ = this.http.request(
      'get',
      'http://localhost:3000/countries'
    );
    request$.subscribe(
      (load) => {
        const currentState = this.subject.getValue();
        this.subject.next({
          isLoading: false,
          countries: load,
          countryId: currentState.countryId,
          error: '',
        } as CountriesState);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('http request: GET is complete');
      }
    );
  }

  postCountry(country: CountryI): void {
    this.http
      .post<CountryI>('http://localhost:3000/countries', country)
      .subscribe(
        (response) => {
          console.log(response);
          const callback: Callback = (state) => {
            return { ...state, countries: [...state.countries, response] };
          };
          this.setState(callback);
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('http request: POST is complete');
        }
      );
  }

  putCountry(country: CountryI): void {
    this.http
      .put<CountryI>(`http://localhost:3000/countries/${country.id}`, country)
      .subscribe(
        (response) => {
          const callback: Callback = (state) => {
            const index = state.countries.findIndex(
              (item) => item.id === country.id
            );
            const newCountries = [...state.countries];
            newCountries.splice(index, 1, country);
            return { ...state, countries: newCountries };
          };
          this.setState(callback);
        },
        (error) => {
          error;
        },
        () => {
          console.log('http request: PUT is complete');
        }
      );
  }

  deleteCountry(id: string): void {
    this.http.delete<string>(`http://localhost:3000/countries/${id}`).subscribe(
      (response) => {
        const callback: Callback = (state) => {
          const index = state.countries.findIndex((item) => item.id === id);
          const newCountries = [...state.countries];
          newCountries.splice(index, 1);
          return { ...state, countries: newCountries };
        };
        this.setState(callback);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('http request: DELETE is complete');
      }
    );
  }
}
