import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CityI } from 'src/typings';
import { CitiesService } from './cities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesComponent implements OnInit, OnDestroy {
  cities: CityI[];
  subscription: Subscription;

  constructor(private citiesService: CitiesService) {
    this.cities = [];
  }

  ngOnInit(): void {
    this.subscription = this.citiesService
      .getCities()
      .subscribe((data) => (this.cities = data));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
