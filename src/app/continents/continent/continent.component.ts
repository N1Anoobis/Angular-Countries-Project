import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContinentService } from 'src/app/services/continents.service';
import { CountriesService } from 'src/app/services/countries.service';
import { TabsService } from 'src/app/services/tabs.service';
import { ContinentI, CountryI } from 'src/typings';
import { TabsComponent } from '../../shared/tabs/tabs.component';

@Component({
  selector: 'app-continent',
  templateUrl: './continent.component.html',
  styleUrls: ['./continent.component.scss'],
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.continent = {
      id: this.route.snapshot.params['id'],
    };
    this.continentsService.setContinentId(this.continent.id);
    this.selectedContinent$.subscribe((res) => (this.id = res.id));
     const firstParam: string =
       this.route.snapshot.queryParamMap.get('tab');

    if (!firstParam) {
   (<any>this.router).navigate([this.router.url], {
     queryParams: { tab: `countries` },
   });
    }
  }

  clicked() {
    // console.log(
    //   this.templateReference1['active'],
    //   this.templateReference2['active']
    // );
    this.router.navigate([], {
      queryParams: {
        tab: null,
        // youCanRemoveMultiple: null,
      },
      queryParamsHandling: 'merge',
    });

    // this.router.navigate([this.router.url], {
    //   queryParams: { tab: `details` },
    // });
  }
}
