import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelRateCardComponent } from './hotel-rate-card.component';

describe('HotelRateCardComponent', () => {
  let component: HotelRateCardComponent;
  let fixture: ComponentFixture<HotelRateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelRateCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelRateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
