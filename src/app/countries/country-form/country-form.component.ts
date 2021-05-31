import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
export class CountryFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  paramsSubscription: Subscription;
  countryIsEdited = false;
  continentsList$: Observable<{ name: string; id: string }[]> =
    this.continentsService.continentsList$;
  selectedCountrySub: Subscription;

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
      } else {
        this.countriesService.setCountryId(null);
      }
    });

    this.selectedCountrySub = this.countriesService.selectedCountry$.subscribe(
      (data) => {
        if (data) {
          this.setFormValues(data);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    this.selectedCountrySub.unsubscribe();
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
    console.log(this.form.value);

    if (this.countryIsEdited) {
      this.countriesService.putCountry(this.form.value);
    } else {
      this.countriesService.postCountry(this.form.value);
    }

    this.router.navigate(['/countries']);
  }

  getFormControl(controlName: string): AbstractControl {
    return this.form.get(controlName);
  }

  setValue(value: string, formControl: AbstractControl): void {
    if (formControl) {
      formControl.setValue(value);
      formControl.markAsTouched();
    }
  }

  handleChange(value: string, formControlName: string): void {
    const formControl = this.getFormControl(formControlName);
    this.setValue(value, formControl);
  }
}
