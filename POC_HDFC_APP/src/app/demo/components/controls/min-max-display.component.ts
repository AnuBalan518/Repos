import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-min-max-display',
  templateUrl: './min-max-display.component.html',
  styleUrls: ['./min-max-display.component.css']
})
export class MinMaxDisplayComponent {
  @Input() fieldName: string = 'Sample Field';
  @Input() actualMinValue: string = '0';
  @Input() actualMaxValue: string = '100';

  minValue: string = '';
  maxValue: string = '';

// @Input() minValue: string | null = null;
// @Input() maxValue: string | null = null;


  minValueError: string | null = null;
  maxValueError: string | null = null;

  @Output() valueChange = new EventEmitter<{ minValue: string; maxValue: string }>();

  onMinMaxChange(): void {
    this.valueChange.emit({
      minValue: this.minValue || this.actualMinValue,
      maxValue: this.maxValue || this.actualMaxValue
    });
    this.validateMinValue();
    this.validateMaxValue();
  }

  validateMinValue(): void {
    const numericMinValue = Number(this.minValue || this.actualMinValue);
    const numericActualMinValue = Number(this.actualMinValue);

    if (numericMinValue < numericActualMinValue) {
      this.minValueError = `Minimum value cannot be less than ${this.actualMinValue}.`;
    } else {
      this.minValueError = null;
    }
  }

  validateMaxValue(): void {
    const numericMaxValue = Number(this.maxValue || this.actualMaxValue);
    const numericActualMaxValue = Number(this.actualMaxValue);

    if (numericMaxValue > numericActualMaxValue) {
      this.maxValueError = `Maximum value cannot be greater than ${this.actualMaxValue}.`;
    } else {
      this.maxValueError = null;
    }
  }
}
