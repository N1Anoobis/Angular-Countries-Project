import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ContinentI } from 'src/typings';
import { ContinentService } from '../services/continents.service';

@Component({
  selector: 'app-create-continent',
  templateUrl: './create-continent.component.html',
  styleUrls: ['./create-continent.component.scss'],
})
export class CreateContinentComponent implements OnInit {
  continentForm: FormGroup;
  savedValue: ContinentI | undefined;
  isEditing: boolean = false;
  selected$: Observable<ContinentI> = this.continentsService.selectedContinent$;

  constructor(
    private continentsService: ContinentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.selected$.subscribe((res) => {
        this.savedValue = res;
      });
      this.isEditing = !this.isEditing;
    }

    this.continentForm = new FormGroup({
      name: new FormControl(
        this.savedValue ? this.savedValue.name : null,
        Validators.required
      ),
      area: new FormControl(
        this.savedValue ? this.savedValue.area : null,
        Validators.required
      ),
      population: new FormControl(
        this.savedValue ? this.savedValue.population : null,
        Validators.required
      ),
      populationDensity: new FormControl(
        this.savedValue ? this.savedValue.populationDensity : null,
        Validators.required
      ),
      minHeight: new FormControl(
        this.savedValue ? this.savedValue.minHeight : null,
        Validators.required
      ),
      maxHeight: new FormControl(
        this.savedValue ? this.savedValue.maxHeight : null,
        Validators.required
      ),
    });
  }

  onSubmit() {
    const newContinent: ContinentI = {
      entity: 'continent',
      id: this.isEditing ? this.savedValue.id : String(new Date()),
      name: this.continentForm.value.name,
      area: this.continentForm.value.area,
      population: this.continentForm.value.population,
      populationDensity: this.continentForm.value.populationDensity,
      minHeight: this.continentForm.value.minHeight,
      maxHeight: this.continentForm.value.maxHeight,
    };
    if (!this.isEditing) {
      this.continentsService.addContinent(newContinent);
    } else {
      this.continentsService.editContinent(newContinent);
    }
    this.continentForm.reset();
  }
}
