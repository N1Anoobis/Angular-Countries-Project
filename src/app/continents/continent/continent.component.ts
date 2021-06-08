import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  ) {}


  ngOnInit(): void {
    this.continent = {
      id: this.route.snapshot.params['id'],
    };
    this.continentsService.setContinentId(this.continent.id);
    this.selectedContinent$.subscribe((res) => (this.id = res.id));

  }
  // ngOnDestroy() {
  // this.countriesInContinent$.unsubscribe();
  // }
}
