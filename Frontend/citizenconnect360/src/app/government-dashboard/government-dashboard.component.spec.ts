import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentDashboardComponent } from './government-dashboard.component';

describe('GovernmentDashboardComponent', () => {
  let component: GovernmentDashboardComponent;
  let fixture: ComponentFixture<GovernmentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovernmentDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovernmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
