import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
@Input() options: string[];
@Input() initialValue: string;
@Output() onChange = new EventEmitter<string>();

handleChange(value: string): void {
  this.onChange.emit(value)
}
}
