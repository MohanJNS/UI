import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizesaveresultsComponent } from './customizesaveresults.component';

describe('CustomizesaveresultsComponent', () => {
  let component: CustomizesaveresultsComponent;
  let fixture: ComponentFixture<CustomizesaveresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomizesaveresultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomizesaveresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
