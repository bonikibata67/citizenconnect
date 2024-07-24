import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AisummaryComponent } from './aisummary.component';

describe('AisummaryComponent', () => {
  let component: AisummaryComponent;
  let fixture: ComponentFixture<AisummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AisummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AisummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
