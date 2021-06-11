import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CityI } from 'src/typings';
import { CitiesInCountryService } from './cities-in-country.service';

@Component({
  selector: 'app-country-cities',
  templateUrl: './country-cities.component.html',
  styleUrls: ['./country-cities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryCitiesComponent implements OnInit, OnDestroy {
  constructor(
    private citiesInCountryService: CitiesInCountryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  citiesPage$: Observable<CityI[]> = this.citiesInCountryService.citiesPage$;
  currentPage$: Observable<number> = this.citiesInCountryService.currentPage$;
  pagesCount$: Observable<number> = this.citiesInCountryService.pagesCount$;
  sortingPerColumn$: Observable<string> =
    this.citiesInCountryService.sortingPerColumn$;
  sortingOrder$: Observable<string> = this.citiesInCountryService.sortingOrder$;

  paramsSubscription: Subscription = this.route.queryParams.subscribe(
    (params) => {
      const stateParams = {
        currentPage: Number(params['page']),
        sortingPerColumn: params['sorting'],
        sortingOrder: params['order'],
      };
      this.citiesInCountryService.loadCitiesPage(stateParams);
    }
  );

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  handlePreviousPage(): void {
    const params = this.route.snapshot.queryParams;
    this.router.navigate(['./'], {
      queryParams: { ...params, page: +params.page - 1 },
      relativeTo: this.route,
    });
  }

  handleNextPage(): void {
    const params = this.route.snapshot.queryParams;
    this.router.navigate(['./'], {
      queryParams: { ...params, page: +params.page + 1 },
      relativeTo: this.route,
    });
  }

  handleSorting(column: string): void{
  const order = this.getSortingOrder(column);
  const params = this.route.snapshot.queryParams;
  this.router.navigate(['./'], {
      queryParams: {...params, sorting: column, order: order},
      relativeTo: this.route,
    });
  }

  getSortingOrder(column: string): string {
      const prevSortingOrder = this.route.snapshot.queryParams['order'];
      const prevColumn = this.route.snapshot.queryParams['sorting'];
      let newOrder: 'ascending' | 'descending';
      if (prevColumn === column && prevSortingOrder === 'ascending') {
        newOrder = 'descending';
      }
      if (prevColumn === column && prevSortingOrder === 'descending') {
        newOrder = 'ascending';
      }
      if (prevColumn !== column) {
        newOrder = 'ascending';
      }
      return newOrder;
  }
}
