import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
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
      map(([countries, continents]) => {
        const countriesResult =
          countries.filter((country) => country.continent === continents);
        return countriesResult;
      }, distinctUntilChanged())
    );
}
