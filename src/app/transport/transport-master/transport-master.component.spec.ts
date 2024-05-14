import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportMasterComponent } from './transport-master.component';

describe('TransportMasterComponent', () => {
  let component: TransportMasterComponent;
  let fixture: ComponentFixture<TransportMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransportMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
