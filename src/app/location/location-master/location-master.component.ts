import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-location-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './location-master.component.html',
  styleUrl: './location-master.component.scss',
  providers: [DataService]
})
export class LocationMasterComponent implements OnInit {
  selecteddata: any;
  public editOnLoad: boolean = false;

  constructor(private fb: FormBuilder, private dataservice: DataService, private router: Router, private route: ActivatedRoute) { }

  locationForm: FormGroup | any;

  ngOnInit(): void {
    this.locationForm = this.fb.group({
      locationName: ['', Validators.required],
      stateCode: ['', Validators.required],
      stateName: ['', Validators.required],
      locationId: ['']
      // enabled: [false]
    });

    if (this.route.snapshot.params['selecteddata']) {
      this.selecteddata = JSON.parse(this.route.snapshot.params['selecteddata']);
    }

    if (this.selecteddata) {
      this.editOnLoad = true;
      this.fillEditInfo();
    }
  }



  onSubmit() {
    if (this.locationForm.valid) {
      const locationData = this.locationForm.value;
      console.log(locationData)
      this.dataservice.saveLocation(locationData).subscribe({
        next: (data) => {
          console.log('Hotel added/updated', data);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
  }

  openAddHotelModal() {
    this.router.navigate(['location-list', {}], { skipLocationChange: true });
  }


  fillEditInfo() {
    if (this.selecteddata) {
      this.locationForm.patchValue({
        locationName: this.selecteddata.locationName,
        locationId: this.selecteddata.locationId,
        stateCode: this.selecteddata.stateCode,
        stateName: this.selecteddata.stateName

      })
    }
  }


}

