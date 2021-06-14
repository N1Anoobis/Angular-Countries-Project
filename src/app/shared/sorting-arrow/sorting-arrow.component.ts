import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-sorting-arrow',
  templateUrl: './sorting-arrow.component.html',
  styleUrls: ['./sorting-arrow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortingArrowComponent {
@Input() sortingOrder!: 'ascending' | 'descending';

setArrowOrder(): string {
  return this.sortingOrder === 'ascending' ? 'fa-sort-up' : 'fa-sort-down'
}
}
