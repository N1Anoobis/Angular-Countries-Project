import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContinentI } from 'src/typings';
import { ContinentService } from '../services/continents.service';

@Component({
  selector: 'app-create-continent',
  templateUrl: './create-continent.component.html',
  styleUrls: ['./create-continent.component.scss']
})
export class CreateContinentComponent implements OnInit {
  continentForm: FormGroup
  constructor(private continentsService: ContinentService) {}

  ngOnInit(): void {
    this.continentForm = new FormGroup({
      'name': new FormControl(null,Validators.required),
      'area': new FormControl(null, Validators.required),
      'population': new FormControl(null, Validators.required),
      'populationDensity': new FormControl(null, Validators.required),
      'minHeight': new FormControl(null, Validators.required),
      'maxHeight': new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
     const newContinent: ContinentI = {
       entity: 'continent',
       id: String(new Date()),
       name: this.continentForm.value.name,
       area: this.continentForm.value.area,
       population: this.continentForm.value.population,
       populationDensity: this.continentForm.value.populationDensity,
       minHeight: this.continentForm.value.minHeight,
       maxHeight: this.continentForm.value.maxHeight,
     };
    this.continentsService.addContinent(newContinent);
    this.continentForm.reset();
  }
}
