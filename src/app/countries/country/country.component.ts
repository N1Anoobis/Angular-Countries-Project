import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryComponent implements OnDestroy {
  private paramsSubscription: Subscription = this.route.params.subscribe(
    (params) => {
      this.countriesService.setCountryId(params['id']);
    }
  );
  selectedCountryName$: Observable<string> =
    this.countriesService.selectedCountryName$;

  constructor(
    private route: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  onDelete(id: string): void {
    this.countriesService.deleteCountry(id);
    this.router.navigate(['/countries']);
  }

  onEdit(id: string): void {
    this.router.navigate([`/countries/edit/${id}`]);
  }
}
