import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CityI, ContinentI, CountryI } from 'src/typings';

@Component({
  selector: 'app-entity-list-item',
  templateUrl: './entity-list-item.component.html',
  styleUrls: ['./entity-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityListItemComponent {
  @Input() data: ContinentI | CountryI | CityI;
}
