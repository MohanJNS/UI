import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationMasterComponent } from './accommodation-master.component';

describe('AccommodationMasterComponent', () => {
  let component: AccommodationMasterComponent;
  let fixture: ComponentFixture<AccommodationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccommodationMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
