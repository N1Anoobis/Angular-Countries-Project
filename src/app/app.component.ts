import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';
import { CitiesService } from './services/cities.service';
import { ContinentService } from './services/continents.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private countriesService: CountriesService,
    private citiesService: CitiesService,
    private continentsService: ContinentService
  ) {}
  title = 'Angular-Countries-Project';

  ngOnInit() {
    this.countriesService.loadCountries();
    this.citiesService.loadCities();
    this.continentsService.getContinents();
  }
}
