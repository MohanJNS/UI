import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerIdSource = new ReplaySubject<number>(1); // 1 here means to remember only the last value
  currentCustomerId = this.customerIdSource.asObservable();

  publishCustomerId(id: number) {
    this.customerIdSource.next(id);
  }
}
