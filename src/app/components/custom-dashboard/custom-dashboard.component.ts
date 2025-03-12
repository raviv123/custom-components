import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GridsterWrapperModule } from '../../gridster.module';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'app-custom-dashboard',
  imports: [CommonModule, GridsterWrapperModule],
  templateUrl: './custom-dashboard.component.html',
  styleUrl: './custom-dashboard.component.scss',
})
export class CustomDashboardComponent {
  @Input() options!: GridsterConfig;
  @Input() dashboard!: GridsterItem[];
  widgetIds: number[]=[];

  ngOnInit() {
 this.dashboard.map((item) => {
      this.widgetIds.push(item['data'].widgetId);
    });  
    
  }

  removeItem(item: GridsterItem) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1)
    sessionStorage.setItem('gridData', JSON.stringify(this.dashboard));
  }

  addItem() {
    this.dashboard.push({ cols: 1, rows: 1, y: 0, x: 0 });
  }
}
