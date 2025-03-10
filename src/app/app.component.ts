import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomInputNumberComponent } from './components/custom-input-number/custom-input-number.component';
import { CustomInputPasswordComponent } from './components/custom-input-password/custom-input-password.component';
import { CustomValidators } from './custom.validator';
import { CustomDashboardComponent } from './components/custom-dashboard/custom-dashboard.component';
import {
  CompactType,
  GridsterConfig,
  GridsterItem,
  GridType,
} from 'angular-gridster2';
import { ApiService } from './apiService/api.service';

const errorMessages = {
  required: 'This is required',
  minlength: 'Please enter atlease 3 letters.',
  pattern: 'pattren is not correct',
  maxlength: 'maxlengh should be 10',
};

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    // CustomInputNumberComponent,
    // CustomInputPasswordComponent,
    CustomDashboardComponent,
  ], //ErrorMessageComponent,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  errorMessages: { [key: string]: string } = errorMessages;

  //   userForm: FormGroup = new FormGroup({
  //     phone: new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(10)])
  //   });

  //   title = 'dummyProject';
  // }

  // form = new FormGroup(
  //   {
  //     number: new FormControl('', [
  //       Validators.required,
  //       CustomValidators.minMaxLengthValidator(2, 10),
  //     ]),
  //     newPassword: new FormControl('', [
  //       Validators.required,
  //       Validators.minLength(8),
  //       Validators.pattern(
  //         '^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$'
  //       ),
  //     ]),
  //     confirmPassword: new FormControl('', [Validators.required]),
  //   },
  //   {
  //     validators: CustomValidators.fieldsMatchValidator(
  //       'newPassword',
  //       'confirmPassword'
  //     ),
  //   }
  // );

  // submit() {
  //   if (this.form.valid) {
  //     console.log(this.form.value);
  //     this.form.reset();
  //   }
  // }
  options!: GridsterConfig; 
  dashboard!: GridsterItem[] 
  constructor(private apiService: ApiService) {
    this.fetchGridData();
  }

  // grids: Array<{ options: GridsterConfig; dashboard: GridsterItem[] }> = [];


  private fetchGridData() {
    this.apiService.getDashboard().subscribe((items: any) => {
            this.options= this.createGridOptions()
          this.dashboard= items.map((item:any, index:number) => ({
            x: index, y:index , cols: 1, rows: 1, 
            data: item 
          }));
      
    });
  }

 private createGridOptions(): GridsterConfig {
    return {
      // disableAutoPositionOnConflict: true,
      margin: 5,
      compactType: CompactType.CompactLeft,
      draggable: { enabled: true, dropOverItems: false },
      resizable: { enabled: true },
      swap: true,
      pushItems: true,
      gridType: GridType.VerticalFixed,
      displayGrid: 'onDrag&Resize',
      minItemCols: 1,
      maxItemCols: 4,
      outerMargin: true,
      minCols: 3,
      maxCols: 3,
      mobileBreakpoint: 600,
      minRows: 4,
      maxRows: 12,
      defaultItemCols: 2,
      defaultItemRows: 2,
      itemChangeCallback: (item, itemComponent) => {
            console.log('Item changed:', item);
          },
    };
  }

  // addGrid() {
  //   this.grids.push({
  //     options: this.createGridOptions(),
  //     dashboard: [],
  //   });
  // }

  // addGrid() {
  //   const newGrid = {
  //     options: {
  //       // disableAutoPositionOnConflict :true, //prevent auto-position
  //       margin: 5, //space between items
  //       compactType: CompactType.CompactLeft, //manages the arrangement of grid items to eliminate empty spaces
  //       draggable: { enabled: true, dropOverItems: false }, // Items can be dragged
  //       resizable: {
  //         enabled: true,
  //         handles: { s: false, e: false, n: true, w: true },
  //       }, // Resizable in certain directions
  //       swap: true, // Allows items to swap places when dragged
  //       pushItems: true, // Pushes other items when dragging
  //       gridType: GridType.VerticalFixed,
  //       displayGrid: 'onDrag&Resize',
  //       minItemCols: 1, // Minimum width of a grid item
  //       maxItemCols: 4, // Maximum width of a grid item
  //       outerMargin: true, //grid uses the body width as a breakpoint
  //       minCols: 3,
  //       maxCols: 3,
  //       mobileBreakpoint: 600,
  //       minRows: 4,
  //       maxRows: 12,
  //       defaultItemCols: 2,
  //       defaultItemRows: 2,
  //       // itemChangeCallback: (item, itemComponent) => {
  //       //   console.log('Item changed:', item);
  //       // },
  //     } as GridsterConfig,
  //     dashboard: [
  //       {
  //         cols: 1,
  //         rows: 1,
  //         x: 0,
  //         y: 0,
  //         dragEnabled: false,
  //         resizeEnabled: false,
  //       },
  //       { cols: 2, rows: 2, y: 0, x: 2 },
  //       { cols: 1, rows: 1, y: 1, x: 0 },
  //     ],
  //   };
  //   this.grids.push(newGrid);
  // }

  // removeGrid(index: number) {
  //   this.grids.splice(index, 1);
  // }
}
