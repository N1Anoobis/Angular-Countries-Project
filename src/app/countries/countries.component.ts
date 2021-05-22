import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountryI } from 'src/typings';
import { CountriesService } from './countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesComponent implements OnInit, OnDestroy {
  countries: CountryI[];
  subscription: Subscription;
  
  constructor(private countriesService: CountriesService) {
    this.countries = [];
  }

  ngOnInit(): void {
    this.subscription = this.countriesService
      .getCountries()
      .subscribe((data) => (this.countries = data));
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
