import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizePackageComponent } from './customize-package.component';

describe('CustomizePackageComponent', () => {
  let component: CustomizePackageComponent;
  let fixture: ComponentFixture<CustomizePackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomizePackageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomizePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
