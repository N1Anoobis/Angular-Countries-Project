import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
