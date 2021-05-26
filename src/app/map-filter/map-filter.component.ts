import { Component, Input, OnInit, Output } from '@angular/core';
import { CityI } from 'src/typings';

@Component({
  selector: 'app-map-filter',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss'],
})
export class MapFilterComponent implements OnInit {
  filtredvalue;
  showInput = false;
  @Output() filtredCities
  chosenCity;
  @Input()
  public cities: CityI[];
  constructor() {}

  ngOnInit(): void {
    this.filtredCities = this.cities
  }

  showRangeInput(city) {
    this.chosenCity = city;
    this.showInput = true;
  }

  onChange() {
    this.calculateDistance(this.cities, this.chosenCity, this.filtredvalue);
  }

  calculateDistance(value: any, chosenCity, filtredvalue): any {
    this.filtredCities.length = 0;
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
        this.filtredCities.push(city);
      }
    }
      console.log(this.filtredCities);
    return this.filtredCities

  }
}
