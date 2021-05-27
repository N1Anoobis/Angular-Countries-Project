import {
  Component,
  ChangeDetectionStrategy,
  forwardRef,
  ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  _value: any;
  isDisabled: boolean;

  constructor(private CD: ChangeDetectorRef) {}

  onChange = (val: any): void => {};

  onTouch = (): void => {};

  set value(val: any) {
      this._value = val;
      this.onChange(val);
      this.onTouch();
    }

  get value(): any {
    return this._value;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.CD.markForCheck();
  }
}
