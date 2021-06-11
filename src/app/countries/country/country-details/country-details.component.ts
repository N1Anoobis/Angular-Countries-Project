import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CountriesService } from 'src/app/services/countries.service';
import { CountryI } from 'src/typings';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryDetailsComponent {
  selectedCountry$: Observable<CountryI> =
    this.countriesService.selectedCountry$;

  constructor(
    private countriesService: CountriesService,
    private router: Router
  ) {}

  onDelete(id: string): void {
    this.countriesService.deleteCountry(id);
    this.router.navigate(['/countries']);
  }

  onEdit(id: string): void {
    this.router.navigate([`/countries/edit/${id}`]);
  }
}
