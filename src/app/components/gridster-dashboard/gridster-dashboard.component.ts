import { Component, Input } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { GridsterWrapperModule } from '../../gridster.module';

@Component({
  selector: 'app-gridster-dashboard',
  imports: [GridsterWrapperModule],
  templateUrl: './gridster-dashboard.component.html',
  styleUrl: './gridster-dashboard.component.scss'
})
export class GridsterDashboardComponent {
  @Input() options: GridsterConfig = {}; 
  @Input() items: GridsterItem[] = []; 


  gridsterOptions: GridsterConfig = {
    gridType: 'fit',
    compactType: 'none',
    mobileBreakpoint: 768,
    margin: 10,
    outerMargin: true,
    pushItems: true,
    ...this.options 
  };
}
