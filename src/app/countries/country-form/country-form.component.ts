import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ContinentService } from 'src/app/services/continents.service';
import { CountriesService } from 'src/app/services/countries.service';
import { CountryI } from 'src/typings';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryFormComponent implements OnInit {
  form: FormGroup;
  paramsSubscription: Subscription;
  countryIsEdited = false;
  continentsList$: Observable<{ name: string; id: string }[]> =
    this.continentsService.continentsList$;

  constructor(
    private countriesService: CountriesService,
    private continentsService: ContinentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      entity: new FormControl('country'),
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      continent: new FormControl(null, [Validators.required]),
      area: new FormControl(null, [Validators.required]),
      population: new FormControl(null, [Validators.required]),
      populationDensity: new FormControl(null, [Validators.required]),
    });

    this.paramsSubscription = this.route.params.subscribe((params) => {
      if (params['id']) {
        this.countryIsEdited = true;
        this.countriesService.setCountryId(params['id']);
        const editedCountryData = this.countriesService.selectedCountry;

        this.setFormValues(editedCountryData);
      }
    });
  }

  setFormValues(country: CountryI): void {
    this.form.setValue({
      entity: country.entity,
      id: country.id,
      name: country.name,
      continent: country.continent,
      area: country.area,
      population: country.population,
      populationDensity: country.populationDensity,
    });
  }

  onSubmit(): void {
    if (this.countryIsEdited) {
      this.countriesService.putCountry(this.form.value);
    } else {
      this.countriesService.postCountry(this.form.value);
    }

    this.router.navigate(['/countries']);
  }
}
