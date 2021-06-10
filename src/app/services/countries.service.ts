import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { CountryI } from '../../typings';
import { distinctUntilChanged, map, filter, tap, delay } from 'rxjs/operators';
import { ContinentService } from './continents.service';

export interface CountriesState {
  isLoading: boolean;
  countries: CountryI[];
  countryId: string;
  error: string;
  searchText: string;
}

type Callback = (state: CountriesState) => CountriesState;

const initialState: CountriesState = {
  isLoading: false,
  countries: [],
  countryId: '',
  error: '',
  searchText: '',
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

  public readonly filteredCountries$: Observable<CountryI[]> = this.state$.pipe(
    map(({ countries, searchText }) => {
      if(searchText === '') return countries;
      return countries.filter((country) =>
        country.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }),
    distinctUntilChanged()
  );

  public readonly countryId$: Observable<string> = this.state$.pipe(
    map((state) => state.countryId, distinctUntilChanged())
  );

  // public readonly selectedCountry$: Observable<CountryI> = this.state$.pipe(
  //   map(({ countries, countryId }) =>
  //     countries.find((country) => country.id === countryId)
  //   ),
  //   distinctUntilChanged()
  // );

  public readonly selectedCountry$: Observable<CountryI> = combineLatest([
    this.state$,
    this.continentsService.continents$,
  ]).pipe(
    filter(([state, continents]) => {
      if (!state.countries) return false;
      if (!continents) return false;
      return true;
    }),
    map(([state, continents]) => {
      const country = state.countries.find(
        (country) => country.id === state.countryId
      );
      if (!country) return null;

      const continentName = continents.find(
        (continent) => continent.id === country.continent
      )?.name;

      if (!continentName) return null;
      return { ...country, continent: continentName };
    }, distinctUntilChanged())
  );

  constructor(
    private http: HttpClient,
    private continentsService: ContinentService
  ) {}

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

  setSearchText(searchText: string): void{
    const callback: Callback = (state) => {
      return {...state, searchText};
    }
    this.setState(callback);
  }

  loadCountries(): void {
    const request$ = this.http.get<CountryI[]>(
      'http://localhost:3000/countries',
      { observe: 'events' }
    );
    request$
      .pipe(
        tap((event) => {
          if (event.type === HttpEventType.Sent) {
            const callback: Callback = (state) => {
              return { ...state, isLoading: true };
            };
            this.setState(callback);
          }
        }),
        delay(2000),
        tap((event) => {
          if (event.type === HttpEventType.Response) {
            const callback: Callback = (state) => {
              return { ...state, isLoading: false };
            };
            this.setState(callback);
          }
        })
      )
      .subscribe(
        (response: HttpResponse<CountryI[]>) => {
          console.log(response);
          const callback: Callback = (state) => {
            return { ...state, countries: response.body };
          };
          this.setState(callback);
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
