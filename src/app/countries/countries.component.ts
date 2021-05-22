import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryI } from 'src/typings';
import { CountriesService } from './countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesComponent {
  countries$: Observable<CountryI[]> = this.countriesService.countries$;
  
  constructor(private countriesService: CountriesService) {
  }
}
