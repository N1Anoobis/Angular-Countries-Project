import { Component, Input, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import { CityI } from 'src/typings';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private map: mapboxgl.Map;
  @Input()
  public cities: CityI[];
  @Input()
  filtredCities: CityI[];
  constructor() {}

  ngOnInit(): void {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibjFhbm9vYmlzIiwiYSI6ImNrcDVhc3drcjA5MzMydnFlY3gyMnd1MGsifQ.iUkw2eL7dH1hAkC0LWG7bg';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 20],
      zoom: 1,
    });
    this.setMarkers();
  }

    ngOnChanges() {
      this.setMarkers();
   }

  setMarkers() {
    this.cities.map((city) => {
      new mapboxgl.Marker()
        .setLngLat([city.longitude, city.latitude])
        .addTo(this.map);
    });
  }
}
