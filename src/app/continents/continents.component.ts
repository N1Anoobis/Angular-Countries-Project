import { Component, OnInit } from '@angular/core';
import { ContinentI } from 'src/typings';
import { ContinentService } from './continents.service';

@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.scss'],
})
export class ContinentsComponent implements OnInit {
  continents: ContinentI[];
  constructor(private continentsService: ContinentService) {}

  ngOnInit(): void {
    this.continents = this.continentsService.getContinents();
  }
  remove(name: string) {
    this.continentsService.removeContinent(name);
  }
}
