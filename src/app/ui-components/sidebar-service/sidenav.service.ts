import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor() { }

  private sidenavToggleSubject = new BehaviorSubject<boolean>(true);
  sidenavToggleAction$ = this.sidenavToggleSubject.asObservable();

  toggle() {
    this.sidenavToggleSubject.next(!this.sidenavToggleSubject.value);
    
  }
  

  setExpanded(state: boolean) {
    this.sidenavToggleSubject.next(state);
  }
}
