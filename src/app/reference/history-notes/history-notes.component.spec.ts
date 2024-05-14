import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryNotesComponent } from './history-notes.component';

describe('HistoryNotesComponent', () => {
  let component: HistoryNotesComponent;
  let fixture: ComponentFixture<HistoryNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
