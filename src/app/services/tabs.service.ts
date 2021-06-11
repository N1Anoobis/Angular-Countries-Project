import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { continents } from 'src/initialData';
import { ContinentI, CountryI } from 'src/typings';
import { ContinentService } from './continents.service';
import { CountriesService } from './countries.service';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  constructor(
    private continentsService: ContinentService,
    private countriesService: CountriesService
  ) {}

  public readonly countriesInContinent$: Observable<CountryI[] | ContinentI[]> =
    combineLatest([
      this.countriesService.countries$,
      this.continentsService.continentId$,
    ]).pipe(
      filter(([countries, continents]) => {
        if (!countries || !continents) {
          return false;
        } else {
          return true;
        }
      }),
      map(([countries, continents]) => {
        const countriesResult = countries.filter(
          (country) => country.continent === continents
        );
        return countriesResult;
      }, distinctUntilChanged())
    );
}
