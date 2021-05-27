import { Component, Input } from '@angular/core';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import { CityI } from 'src/typings';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  private map: mapboxgl.Map;
  @Input()
  public cities: CityI[];
  @Input()
  filtredCities: CityI[];
  markers = []
  data =[]
  container
  constructor() {}

 ngAfterViewInit()  {
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
     this.data = this.filtredCities ? this.filtredCities : this.cities
      this.markers.forEach((marker) => marker.remove());
      this.markers = [];
      this.setMarkers();
   }

  setMarkers() {
   this.data.length > 0 && this.data.map((city) => {
     let marker = new mapboxgl.Marker()
        .setLngLat([city.longitude, city.latitude])
        .addTo(this.map);
        this.markers.push(marker)
    });
  }
}
