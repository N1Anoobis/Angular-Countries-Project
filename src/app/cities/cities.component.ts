import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { CityI } from 'src/typings';
import { CitiesService } from '../services/cities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesComponent {
  cities$: Observable<CityI[]> = this.citiesService.cities$;
  cities: CityI[];
  constructor(private citiesService: CitiesService) {}

  ngOnInit() {
    this.cities$.subscribe((res) => (this.cities = res));
  }
}
