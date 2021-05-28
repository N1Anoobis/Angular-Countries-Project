import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import { CityI, Coordinates } from 'src/typings';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  private map: mapboxgl.Map;
  @Input()
  isPickable = false;
  @Input()
  filtredCities: CityI[];
  @Input()
  chosenCity: CityI;
  markers = [];
  @Output() isReseted = new EventEmitter<boolean>();
  @Output() pickedCoords = new EventEmitter<Coordinates>();
  constructor() {}

  ngAfterViewInit() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibjFhbm9vYmlzIiwiYSI6ImNrcDVhc3drcjA5MzMydnFlY3gyMnd1MGsifQ.iUkw2eL7dH1hAkC0LWG7bg';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 20],
      zoom: 1,
    });
    if (this.isPickable) {
      this.handlePicked(this.map, this.markers, this.pickedCoords);
    }
    if (this.chosenCity) {
      this.setSingleCity(this.map, this.markers);
    }
    this.setMarkers();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];
    if (changes.chosenCity) {
      this.markers.forEach((marker) => marker.remove());
      this.markers = [];
      this.setSingleCity();
      if (changes.chosenCity.previousValue) {
        if (
          changes.chosenCity.previousValue !== changes.chosenCity.currentValue
        ) {
          this.filtredCities = [];
          this.isReseted.emit(true);
          this.setSingleCity();
        }
      }
    }
    this.setMarkers();
  }
  handlePicked(map, markers, pickedCoords) {
    this.map.on('click', function (e) {
      // e.lngLat is the longitude, latitude geographical position of the event
      markers.forEach((marker) => marker.remove());
      markers = [];
      let marker = new mapboxgl.Marker()
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(map);
      markers = [...markers, marker];
      pickedCoords.emit([e.lngLat.lng, e.lngLat.lat]);
    });
  }

  setSingleCity(map?, markers?) {
    if (this.chosenCity !== undefined) {
      if (map || this.map) {
        let marker = new mapboxgl.Marker()
          .setLngLat([this.chosenCity.longitude, this.chosenCity.latitude])
          .addTo(map ? map : this.map);
        markers ? markers : (this.markers = [...this.markers, marker]);
      }
    }
  }

  setMarkers() {
    if (this.map !== undefined) {
      if (this.filtredCities) {
        this.filtredCities.map((city) => {
          let marker = new mapboxgl.Marker()
            .setLngLat([city.longitude, city.latitude])
            .addTo(this.map);
          this.markers = [...this.markers, marker];
        });
      }
    }
  }
}
