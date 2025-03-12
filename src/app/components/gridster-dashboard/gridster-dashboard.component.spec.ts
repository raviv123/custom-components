import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridsterDashboardComponent } from './gridster-dashboard.component';

describe('GridsterDashboardComponent', () => {
  let component: GridsterDashboardComponent;
  let fixture: ComponentFixture<GridsterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridsterDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridsterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
