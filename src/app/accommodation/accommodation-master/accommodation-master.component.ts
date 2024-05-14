import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';

import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { HotelRateCardComponent } from '../hotel-rate-card/hotel-rate-card.component';

import { tap } from 'rxjs';
import { PackageListComponent } from '../../package/package-list/package-list.component';


@Component({
  selector: 'app-accommodation-master',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule, RouterModule
    , HotelRateCardComponent, PackageListComponent],
  providers: [DataService, DatePipe],
  templateUrl: './accommodation-master.component.html',
  styleUrl: './accommodation-master.component.scss'
})
export class AccommodationMasterComponent implements OnInit {

  public isBrowser: boolean = false;
  hotelForm: FormGroup | any;
  location: any[] = [];
  selecteddata: any;
  objkeys: any;
  taglist: any[] = [];
  selectedSeasonId!: string;
  accommodations: any[] = [];

  filteredRateCards: any;
  allRateCards: any;
  accommId!: number;
  ratecards: any;
  data: any

  isNewAccordionOpen: boolean = false;
  isEditMode: boolean = false;
  constructor(private dataservice: DataService,
    private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe) {

    this.hotelForm = this.fb.group({
      accommName: ['', Validators.required],
      locationId: [''],
      locationName: [''],
      accommType: [''],
      accommId: ['']

    });

  }
  ngOnInit(): void {
    this.getPlace();
    this.gettagsMaster();
    this.extractFormRouteParams()

  }


  enableForm() {
    this.fillEditInfo();
    this.hotelForm.enable();
    this.isEditMode = true;
  }
  cancelEdit() {
    this.hotelForm.disable();
    this.isEditMode = false;
    this.fillEditInfo();
  }

  extractFormRouteParams() {
    const routeParams = this.route.snapshot.params;
    if (routeParams['selecteddata']) {
      this.selecteddata = JSON.parse(routeParams['selecteddata']);
      if (this.selecteddata && this.selecteddata.accommId) {
        this.accommId = this.selecteddata.accommId;
        this.getAccommdationMaster(this.accommId);
      }

      this.fillEditInfo();
    }
  }
  onSubmit() {
    if (this.hotelForm.valid) {
      const formValues = this.hotelForm.value;
      const locationId = Number(formValues.locationId);
      let locationName = this.location.find(s => s.locationId === locationId)?.locationName.trim() || '';
      if (locationName === '') {
        console.error(`No location found for locationId ${locationId}.`);
      }
      const payload = { ...formValues, locationName };
      console.log(payload)
      this.dataservice.saveOrUpdateAccommodation(payload).subscribe({
        next: (data) => {
          if (data.accommodationMaster.accommId) {
            this.accommId = data.accommodationMaster.accommId;
            this.hotelForm.disable();
            this.isEditMode = false;
          } else {
            console.error('No accommId returned from the server.');
          }
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
  }




  addRateCards(accommId: number) {
    if (!this.ratecards) {
      this.ratecards = [];
    }
    let ratecard: any = {
      accomm_id: accommId,
      deleted: false,
      season_id: null,
      season_name: null,
      dateRanges: this.fb.array([]),
      ratecards: this.fb.array([]),
    };
    this.ratecards.push(ratecard);
    this.isNewAccordionOpen = true;
  }


  getPlace() {
    this.dataservice.getLocations().subscribe(location => {
      this.location = location.locationDetails;
      console.log(this.location)
    }
    )
  }

  gettagsMaster() {
    this.dataservice.getTags().subscribe((data: any) => {
      this.taglist = data.tagsDetails;
    }
    )
    console.log(this.taglist);
  }
  openAddHotelModal() {
    this.router.navigate(['accommodation-list', {}], { skipLocationChange: true });
  }

  fillEditInfo() {
    if (this.selecteddata && this.hotelForm) {

      this.hotelForm.patchValue({
        accommId: this.selecteddata.accommId,
        accommName: this.selecteddata.accommName,
        locationId: this.selecteddata.locationId,
        accommType: this.selecteddata.accommType,
      });

      this.hotelForm.disable();
    }
  }



  getAccommdationMaster(accommid: number) {
    this.dataservice.getHotelratecard(accommid).subscribe((data: any) => {
      console.log(data)
      this.ratecards = data;
    }
    )
  }

  getDateRanges(daterange: any) {
    if (daterange !== null && daterange !== undefined) {
      const dateRanges = daterange.map((range: any) => ({
        rate_from_date: this.formatDate(range.rate_from),
        rate_to_date: this.formatDate(range.rate_to),
        daterangeId: range.daterange_id
      }));
      return dateRanges;
    } else {
      return null;
    }

  }

  confirmRemoveSeason(seasonId: number, index: number) {
    console.log(seasonId)
    console.log(index)
    const rc = this.ratecards[index]
    if (seasonId !== null) {
      if (window.confirm('Are you sure you want to delete this season?')) {
        console.log(rc)
        rc.deleted = true;
        this.ratecards.splice(index, 1);
        this.removeSeason(rc);
      }
    } else {
      this.ratecards.splice(index, 1);
    }

  }

  removeSeason(ratecard: any) {
    console.log(ratecard)
    const formData = {
      hotelSeason: {
        accommId: ratecard.accomm_id,
        seasonName: ratecard.season_name,
        seasonId: ratecard.season_id,
        deleted: ratecard.deleted
      },
      hotelSeasonDateRange: ratecard.daterange?.map((dr: any) => ({
        rate_from_date: dr.rate_from,
        rate_to_date: dr.rate_to,
        daterangeId: dr.daterange_id,
        deleted: dr.deleted
      })) ?? [],


    };
    // console.log(formData);
    this.dataservice.saveDateRange(formData).subscribe({
      next: (response) => {
        if (response) {

          alert("deleted successfully")
        }
      },
      error: (error) => console.error('Error:', error)
    });
  }


  formatDate(date: string): any {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
