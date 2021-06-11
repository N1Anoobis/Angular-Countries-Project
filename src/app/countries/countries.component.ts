import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CountryI } from 'src/typings';
import {
  CountriesService,
  CountriesState,
} from '../services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesComponent implements OnInit {
  state$: Observable<CountriesState> = this.countriesService.state$;
  countries$: Observable<CountryI[]> = this.countriesService.filteredCountries$;

  constructor(private countriesService: CountriesService) {}

  ngOnInit() {
    this.countriesService.loadCountries();
  }

  handleSearch(searchText: string): void {
    console.log(searchText);
    this.countriesService.setSearchText(searchText);
  }
}
