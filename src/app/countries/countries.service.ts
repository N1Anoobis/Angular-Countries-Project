import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CountryI } from '../../typings';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private countries: CountryI[];
  private subject: BehaviorSubject<CountryI[]>;

  constructor() {
    this.countries = [];
    this.subject = new BehaviorSubject(this.countries);
  }

  loadCountries(): void {
    this.countries.push(
      {
        entity: 'country',
        id: 'afganistan',
        name: 'Afganistan',
        continent: 'Asia',
        area: 652230,
        population: 30419928,
        populationDensity: 45.74,
      },
      {
        entity: 'country',
        id: 'albania',
        name: 'Albania',
        continent: 'Europe',
        area: 28748,
        population: 3195000,
        populationDensity: 111.1,
      },
      {
        entity: 'country',
        id: 'burundi',
        name: 'Burundi',
        continent: 'Africa',
        area: 27830,
        population: 8691000,
        populationDensity: 312,
      },
      {
        entity: 'country',
        id: 'dominican-republic',
        name: 'Dominican Republic',
        continent: 'North America',
        area: 48730,
        population: 9049595,
        populationDensity: 185,
      },
      {
        entity: 'country',
        id: 'ecuador',
        name: 'Ecuador',
        continent: 'South America',
        area: 283560,
        population: 13928000,
        populationDensity: 49,
      },
      {
        entity: 'country',
        id: 'poland',
        name: 'Poland',
        continent: 'Europe',
        area: 652230,
        population: 30419928,
        populationDensity: 45.74,
      },
      {
        entity: 'country',
        id: 'micronesia',
        name: 'Micronesia',
        continent: 'Australia',
        area: 702,
        population: 135000,
        populationDensity: 171,
      }
    );
    this.subject.next(
      this.countries.map((item) => {
        return { ...item };
      })
    );
  }

  getCountries(): Observable<CountryI[]> {
    return this.subject;
  }
}
