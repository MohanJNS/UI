import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { AgGridAngular, AgGridModule } from 'ag-grid-angular';

import { ColDef, ColGroupDef, DomLayoutType } from 'ag-grid-community';
interface PrevEnquiries {
  LastUpdated: string;
  Trip: string;
  TravelCategory: string;
  Status: string;
  Executive: string;
}
interface PrevBookings {
  BookingId: number;
  Trip: string;
  TravelCategory: string;
  Dates: string;
  Pax: number;
  Cost: string;
  Executive: string;
}
@Component({
  selector: 'app-travel-history',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AgGridAngular],
  templateUrl: './travel-history.component.html',
  styleUrl: './travel-history.component.scss'
})
export class TravelHistoryComponent {
  travelForm: FormGroup | any;
  travelExpanded: boolean = false;
  public domLayout: DomLayoutType = 'autoHeight';
  public headerHeight = 50;
  defaultColDef = {
    sortable: true,
    cellStyle: {'border-right-color': '#e2e2e2'},
    wrapHeaderText: true,
    autoHeight: true
  };
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {

  }
  toggleAccordion(collapseId: string) {
    if (collapseId === 'travelCollapse') {
      this.travelExpanded = !this.travelExpanded;
    }
  }
  title = 'trip-details-table';
  prevBookings: PrevBookings[] = [
    {
      BookingId: 2001,
      Trip: 'Rajastan 6N7D',
      Dates: '01-10-2023 to 07-10-2023',
      Pax: 4,
      Cost: 'INR 150,000',
      TravelCategory: 'Family',
      Executive: 'Lilly'
    },
    {
      BookingId: 1001,
      Trip: 'Meghalaya 6N7D',
      Dates: '01-02-2023 to 07-02-2023',
      Pax: 4,
      Cost: 'INR 120,000',
      TravelCategory: 'Family',
      Executive: 'Lucy'
    }
  ]


  columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'BookingId', sortable: true, filter: true, width: 110,wrapText: true} ,
    { field: 'Trip', sortable: true, filter: true,width: 170,wrapText: true},
    { field: 'Dates', sortable: true, filter:true,width: 220,wrapText: true},
    { field: 'Pax', sortable: true, filter:true,width: 70,wrapText: true},
    { field: 'Cost', sortable: true, filter:true,width: 100,wrapText: true},
    { field: 'Executive', sortable: true, filter:true,width: 170,wrapText: true}
  ];
  

  rowData: PrevBookings[] = this.prevBookings;
  
  prevEnquiries: PrevEnquiries[] = [
    {
      LastUpdated: '01-2-2024',
      Trip: 'Rajastan 6N7D',
      TravelCategory: 'Family',
      Status: 'OnHold',    
      Executive: 'Lilly'
    },
    {
      LastUpdated: '01-4-2024',
      Trip: 'Sikkim 6N7D',
      TravelCategory: 'Family',
      Status: 'Not Interested',
      Executive: 'Lucy'
    }
  ]


  columnEnquiryDefs: (ColDef | ColGroupDef)[] = [
    { field: 'LastUpdated', sortable: true, filter: true, width: 135,wrapText: true} ,
    { field: 'Trip', sortable: true, filter: true,width: 170,wrapText: true},    
    { field: 'TravelCategory', sortable: true, filter:true,width: 170,wrapText: true},
    { field: 'Status', sortable: true, filter:true,width: 150,wrapText: true},
    { field: 'Executive', sortable: true, filter:true,width: 150,wrapText: true}
  ];
  

  rowEnquiryData: PrevEnquiries[] = this.prevEnquiries;

  gridOptions = {
    icons: {
      sortAscending: '<i class="fas fa-sort-alpha-up"></i>', // FontAwesome icon
      sortDescending: '<i class="fas fa-sort-alpha-down"></i>',
      // other icons...
    }
  };


}
