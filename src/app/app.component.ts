import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  GridsterConfig,
  GridsterItem,
  GridsterItemComponentInterface,
  GridType,
} from 'angular-gridster2';
import { ApiService } from './apiService/api.service';
import { CustomDashboardComponent } from './components/custom-dashboard/custom-dashboard.component';
import { isPlatformBrowser } from '@angular/common';

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
  data: any;
  isBrowser: boolean;
  options!: GridsterConfig;
  dashboard!: GridsterItem[];
  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.fetchGridData();
  }

  // grids: Array<{ options: GridsterConfig; dashboard: GridsterItem[] }> = [];

  private fetchGridData() {
    if (this.isBrowser) {
      this.data = sessionStorage.getItem('gridData');
    }
    this.apiService.getDashboard().subscribe((items: any) => {
      this.options = this.createGridOptions();

      if (this.data) {
        this.dashboard = JSON.parse(this.data);
      } else {
        this.dashboard = items.map((item: any, index: number) => ({
          x: index % 3,
          y: Math.floor(index / 3),
          cols: 1,
          rows: 1,
          data: item,
          resizeEnabled: item.fixed ? false : true,
          dragEnabled: item.fixed ? false : true,
        }));

        this.saveGrids();
      }
    });
  }
  private createGridOptions(): GridsterConfig {
    return {
      // disableAutoPositionOnConflict: true, // Disable auto-positioning on conflict
      margin: 5,
      // compactType: CompactType.CompactLeft, //controls how items are rearranged when a new item is added or a widget is removed, (compactUp, compactLeft, compactRight, compactDown)
      draggable: { enabled: true, //gridster configuration to allow items to be dragged
        dropOverItems: false },
      resizable: { enabled: true }, //enable/disable resizing of items
      swap: true, //swap items when they are dragged
      pushItems: true, //enable/disable item push on resize or drag
      gridType: GridType.VerticalFixed, //defines how the grid behaves
      displayGrid: 'none', //show/hide grids
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
        this.saveGrids();
      },
      itemResizeCallback: (
        item: GridsterItem,
        itemComponent: GridsterItemComponentInterface
      ) => {
        this.saveGrids();
      },
      itemRemovedCallback: (item, itemComponent) => {
        this.saveGrids();
      },

      gridSizeChangedCallback: (newSize: any) => {
        this.saveGrids();
      },
    };
  }

  saveGrids() {
    if (this.isBrowser) {
      sessionStorage.setItem('gridData', JSON.stringify(this.dashboard));
    }
  }
}
