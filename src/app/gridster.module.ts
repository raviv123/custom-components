import { NgModule } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';

@NgModule({
  imports: [GridsterModule],
  exports: [GridsterModule] 
})
export class GridsterWrapperModule { }
