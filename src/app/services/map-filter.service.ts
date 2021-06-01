import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { CityI, ContinentI, CountryI } from '../../typings';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ContinentService } from './continents.service';
import { CitiesService } from './cities.service';
import { CountriesService } from './countries.service';

@Injectable({ providedIn: 'root' })
export class MapFilterService {
  constructor(
    private countriesService: CountriesService,
    private continentsService: ContinentService,
    private citiesService: CitiesService
  ) {}

  public readonly citiesInContinent$: Observable<
    CountryI[] | CityI[] | ContinentI[]
  > = combineLatest([
    this.countriesService.state$,
    this.continentsService.continentId$,
    this.citiesService.cities$,
  ]).pipe(
    map(([state, continents, cities]) => {
      const countriesResult = state.countries.filter(
        (country) => country.continent === continents
      );
      let result = [];
      for (const city of cities) {
        for (const country of countriesResult) {
          if (country.name === city.countryId) {
            result = [...result, city];
          }
        }
      }
      return result;
    }, distinctUntilChanged())
  );
}
