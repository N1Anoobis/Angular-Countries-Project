import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CityI, ContinentI, CountryI } from 'src/typings';
import { ContinentService } from '../services/continents.service';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-map-filter',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapFilterComponent implements OnInit {
  filtredvalue: number = 0;
  showInput = false;
  filtredCities: CountryI[] | CityI[] | ContinentI[];
  chosenCity: CityI;
  options;
  dropdownValue;
  isDeafultFilter = true;

  preFiltredCities: CountryI[] | CityI[] | ContinentI[];
  @Input()
  public cities: CityI[];
  continent$: Observable<ContinentI[]> = this.continentService.continents$;
  citiesInContinent$: Observable<CountryI[] | CityI[] | ContinentI[]> =
    this.countriesService.citiesInContinent$;
  constructor(
    private continentService: ContinentService,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.continentService.continentsList$.subscribe(
      (res) => (this.options = res.map((res) => res.name))
    );
  }

  showRangeInput(city) {
    this.chosenCity = city;
    this.showInput = true;
  }

  changeMode() {
    this.isDeafultFilter = !this.isDeafultFilter;
    this.filtredCities = [];
    this.filtredvalue = 0;
    this.showInput = false;
  }

  onChangeSelected(id) {
   if(!id) return
    let continentId;
    this.continentService.continentsList$.subscribe(
      (res) => (continentId = res.find((res) => res.name === id))
    );
    this.continentService.setContinentId(continentId.id);
    this.citiesInContinent$.subscribe((res) => (this.preFiltredCities = res));
    this.filtredCities = this.preFiltredCities;
  }

  onChange() {
    this.calculateDistance(this.cities, this.chosenCity, this.filtredvalue);
  }

  calculateDistance(value: any, chosenCity, filtredvalue): any {
    this.filtredCities = [];
    for (const city of value) {
      var radlat1 = (Math.PI * city.latitude) / 180;
      var radlat2 = (Math.PI * chosenCity['latitude']) / 180;
      var theta = city.longitude - chosenCity['longitude'];
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344;
      dist = Math.floor(dist);
      if (dist < filtredvalue) {
        this.filtredCities = [...this.filtredCities, city];
      }
    }
  }
}
