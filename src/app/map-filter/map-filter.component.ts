import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CityI } from 'src/typings';

@Component({
  selector: 'app-map-filter',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapFilterComponent implements OnInit {
  filtredvalue: number = 0;
  showInput = false;
  filtredCities: CityI[];
  chosenCity: CityI;
  @Input()
  public cities: CityI[];
  constructor() {}

  ngOnInit(): void {}

  showRangeInput(city) {
    this.chosenCity = city;
    this.showInput = true;
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
