import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadUpdatesComponent } from './lead-updates.component';

describe('LeadUpdatesComponent', () => {
  let component: LeadUpdatesComponent;
  let fixture: ComponentFixture<LeadUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadUpdatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
