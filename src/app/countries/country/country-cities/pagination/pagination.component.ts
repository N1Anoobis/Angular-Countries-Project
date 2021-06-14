import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() pagesCount!: number;

  @Output() onPreviousPage = new EventEmitter();
  @Output() onNextPage = new EventEmitter();

  handlePrevious(): void {
    this.onPreviousPage.emit();
  }

  handleNext(): void {
    this.onNextPage.emit();
  }
}
