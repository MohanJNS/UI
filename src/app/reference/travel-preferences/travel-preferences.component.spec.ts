import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPreferencesComponent } from './travel-preferences.component';

describe('TravelPreferencesComponent', () => {
  let component: TravelPreferencesComponent;
  let fixture: ComponentFixture<TravelPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelPreferencesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TravelPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
