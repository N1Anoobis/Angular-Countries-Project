import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CityI } from 'src/typings';

@Component({
  selector: 'app-cities-table',
  templateUrl: './cities-table.component.html',
  styleUrls: ['./cities-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CitiesTableComponent {

@Input() data!: CityI[];
@Input() sortingPerColumn!: string;
@Input() sortingOrder!: 'ascending' | 'descending';
@Output() changeSorting = new EventEmitter<string>();

handleChangeSorting(column: string, ): void{
  this.changeSorting.emit(column)
}
}
