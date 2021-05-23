import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CountriesService } from 'src/app/services/countries.service';
import { CountryI } from 'src/typings';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryComponent implements OnInit, OnDestroy {
  private paramsSubscription: Subscription;
  selectedCountry$: Observable<CountryI> =
    this.countriesService.selectedCountry$;

  constructor(
    private route: ActivatedRoute,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params) =>
      this.countriesService.setCountryId(params['id'])
    );
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
