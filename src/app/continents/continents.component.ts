import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContinentI } from 'src/typings';
import { ContinentService } from '../services/continents.service';

@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.scss'],
})
export class ContinentsComponent implements OnInit {
  continents$: Observable<ContinentI[]> = this.continentsService.continents$;
  constructor(private continentsService: ContinentService) {}

  ngOnInit(): void {}

  remove(id: string) {
    this.continentsService.removeContinent(id);
  }
}
