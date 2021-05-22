import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { CountryI } from 'src/typings';
import { CountriesService } from './countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesComponent {
  countries$: Observable<CountryI[]> = this.countriesService.state$;
  
  constructor(private countriesService: CountriesService) {
  }
}
