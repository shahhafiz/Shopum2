import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { DayDiffPipe } from "../pipes/day-diff.pipe";
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ 
    DayDiffPipe
  ],
  exports: [
    DayDiffPipe
  ]
})
export class ApplicationPipesModule {}