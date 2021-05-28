import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CitiesService } from 'src/app/services/cities.service';
import { CityI } from 'src/typings';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityComponent implements OnInit {
  selected$: Observable<CityI> = this.citiesService.selectedCity$;
  constructor(
    private citiesService: CitiesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.citiesService.setCityId(this.route.snapshot.params['id']);
  }

  onEdit(id: string): void {
    this.router.navigate([`/cities/edit/${id}`]);
  }
}
