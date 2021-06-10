import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContinentService } from 'src/app/services/continents.service';
import { CountriesService } from 'src/app/services/countries.service';
import { TabsService } from 'src/app/services/tabs.service';
import { ContinentI, CountryI } from 'src/typings';
import { TabsComponent } from '../../shared/tabs/tabs.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-continent',
  templateUrl: './continent.component.html',
  styleUrls: ['./continent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContinentComponent implements OnInit {
  @ViewChild('templateReference1') templateReference1: ElementRef;
  @ViewChild('templateReference2') templateReference2: ElementRef;
  continent: { id: string };
  id;
  countries = [];
  selectedContinent$: Observable<ContinentI> =
    this.continentsService.selectedContinent$;

  countriesInContinent$: Observable<CountryI[] | ContinentI[]> =
    this.tabsService.countriesInContinent$;

  constructor(
    private route: ActivatedRoute,
    private continentsService: ContinentService,
    private tabsService: TabsService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.continent = {
      id: this.route.snapshot.params['id'],
    };
    this.continentsService.setContinentId(this.continent.id);
    const firstParam: string = this.route.snapshot.queryParamMap.get('tab');

    if (!firstParam) {
      (<any>this.router).navigate([this.router.url], {
        queryParams: { tab: `countries` },
      });
    }
  }

  clicked() {
    if (this.templateReference2['active']) {
      this.location.go(`${this.router.url.split('?')[0]}?tab=details`);
    } else if (this.templateReference1['active']) {
      this.location.go(`${this.router.url.split('?')[0]}?tab=countries`);
    }
  }
}
