import { Component, Input, OnInit } from '@angular/core';
import { ContinentI } from 'src/typings';
import { ContinentService } from './continents.service';

@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.scss'],
})
export class ContinentsComponent implements OnInit {
  continents: ContinentI[];
  inputValue: string = '';

  constructor(private continentsService: ContinentService) {}

  ngOnInit(): void {
    this.continents = this.continentsService.getContinents();
  }
  remove(name: string) {
    this.continentsService.removeContinent(name);
    this.continents = this.continentsService.getContinents();
  }
  addContinent() {
    this.continentsService.addContinent({
      entity: 'continent',
      id: `${this.inputValue}`,
      name: this.inputValue,
      area: 24709000,
      population: 579024000,
      populationDensity: 22.9,
      minHeight: 86,
      maxHeight: 6194,
    });
    this.continents = this.continentsService.getContinents();
    this.inputValue = '';
  }
}
