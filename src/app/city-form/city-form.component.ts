import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CityI, Coordinates, CountryI } from 'src/typings';
import { CitiesService } from '../services/cities.service';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityFormComponent implements OnInit {
  cityForm: FormGroup;
  savedValue: CityI | undefined;
  isEditing: boolean = false;
  selected$: Observable<CityI> = this.citiesService.selectedCity$;
  countries$: Observable<CountryI[]> = this.countriesService.countries$;
  latitude: number;
  longitude: number;

  constructor(
    private citiesService: CitiesService,
    private route: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.selected$.subscribe((res) => {
        this.savedValue = res;
      });
      this.longitude= this.savedValue.latitude;
      this.latitude = this.savedValue.longitude;
      this.isEditing = !this.isEditing;
    }

    this.cityForm = new FormGroup({
      countryId: new FormControl(
        this.savedValue ? this.savedValue.countryId : null,
        Validators.required
      ),
      name: new FormControl(
        this.savedValue ? this.savedValue.name : null,
        Validators.required
      ),
      area: new FormControl(
        this.savedValue ? this.savedValue.area : null,
        Validators.required
      ),
      population: new FormControl(
        this.savedValue ? this.savedValue.population : null,
        Validators.required
      ),
      populationDensity: new FormControl(
        this.savedValue ? this.savedValue.populationDensity : null,
        Validators.required
      ),
      isCapital: new FormControl(
        this.savedValue ? this.savedValue.isCapital : false,
        Validators.required
      ),
    });
  }

  getCoords(coords: Coordinates) {
    this.latitude = coords[0];
    this.longitude = coords[1];
  }

  onSubmit(): void {
    const newCity: CityI = {
      entity: 'city',
      id: this.isEditing ? this.savedValue.id : String(new Date()),
      countryId: this.cityForm.value.countryId,
      name: this.cityForm.value.name,
      area: this.cityForm.value.area,
      population: this.cityForm.value.population,
      populationDensity: this.cityForm.value.populationDensity,
      isCapital: this.cityForm.value.isCapital,
      longitude: this.latitude,
      latitude: this.longitude,
    };
    if (!this.latitude) {
      window.alert('City must have location');
      return;
    }
    if (!this.isEditing) {
      this.citiesService.addCity(newCity);
    } else {
      this.citiesService.editCity(newCity);
    }
    this.cityForm.reset();
    this.router.navigate([`/cities`]);
  }
}
