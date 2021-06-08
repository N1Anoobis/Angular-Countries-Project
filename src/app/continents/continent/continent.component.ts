import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ContinentService } from 'src/app/services/continents.service';
import { ContinentI } from 'src/typings';
import { TabsComponent } from '../../shared/tabs/tabs.component';

@Component({
  selector: 'app-continent',
  templateUrl: './continent.component.html',
  styleUrls: ['./continent.component.scss'],
})
export class ContinentComponent implements OnInit {
  continent: { name: string };
  selectedContinent$: Observable<ContinentI> =
    this.continentsService.selectedContinent$;

  constructor(
    private route: ActivatedRoute,
    private continentsService: ContinentService
  ) {}

  ngOnInit(): void {
    this.continent = {
      name: this.route.snapshot.params['id'],
    };
    this.continentsService.setContinentId(this.continent.name);
  }
}
