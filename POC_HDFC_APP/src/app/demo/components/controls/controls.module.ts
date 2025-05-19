import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinMaxDisplayComponent } from './min-max-display.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MinMaxDisplayComponent],
  exports: [MinMaxDisplayComponent],
  imports: [CommonModule, FormsModule]
})
export class ControlsModule {}
