import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CityI } from '../../typings';

@Injectable({ providedIn: 'root' })
export class CitiesService {
  private cities: CityI[];
  private subject: BehaviorSubject<CityI[]>;

  constructor() {
    this.cities = [];
    this.subject = new BehaviorSubject(this.cities);
  }

  loadCities(): void {
    this.cities.push(
      {
        entity: 'city',
        id: 'cartagena',
        name: 'Cartagena',
        countryId: 'Colombia',
        area: 572,
        population: 914552,
        populationDensity: 1600,
        isCapital: false,
        latitude: 10.393228221548107,
        longitude: -75.48822820777838,
      },
      {
        entity: 'city',
        id: 'pattaya',
        name: 'Pattaya',
        countryId: 'Thailand',
        area: 53,
        population: 119532,
        populationDensity: 2.238,
        isCapital: false,
        latitude: 12.9239994863064,
        longitude: 100.88250331601975,
      },
      {
        entity: 'city',
        id: 'rio-de-janeiro',
        name: 'Rio de Janeiro',
        countryId: 'Brazil',
        area: 1260,
        population: 6498837,
        populationDensity: 5105,
        isCapital: false,
        latitude: -23.0569325025763,
        longitude: -43.28135207428946,
      },
      {
        entity: 'city',
        id: 'cabo-san-lucas',
        name: 'Cabo San Lucas',
        countryId: 'Mexico',
        area: 48,
        population: 202694,
        populationDensity: 94,
        isCapital: false,
        latitude: 22.890642531070633,
        longitude: -109.916428999456,
      },
      {
        entity: 'city',
        id: 'puerto-princesa',
        name: 'Puerto Princesa',
        countryId: 'Philippines',
        area: 60,
        population: 255116,
        populationDensity: 110,
        isCapital: false,
        latitude: 9.764073652280166,
        longitude: 118.74710820264717,
      },
      {
        entity: 'city',
        id: 'Veenendaal',
        name: 'Veenendaal',
        countryId: 'Netherlands',
        area: 20,
        population: 65589,
        populationDensity: 3370,
        isCapital: false,
        latitude: 52.02630003951686,
        longitude: 5.554436743047774,
      },
      {
        entity: 'city',
        id: 'maputo',
        name: 'Maputo',
        countryId: 'Mozambique',
        area: 34769,
        population: 1088449,
        populationDensity: 3100,
        isCapital: true,
        latitude: -25.968903935780062,
        longitude: 32.57315546155215,
      }
    );
    
    this.subject.next(
      this.cities.map((item) => {
        return { ...item };
      })
    );
  }

  getCities(): Observable<CityI[]> {
    return this.subject;
  }
}
