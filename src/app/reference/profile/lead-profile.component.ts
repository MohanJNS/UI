import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef, ColGroupDef, DomLayoutType } from 'ag-grid-community';
import { TravelHistoryComponent } from '../travel-history/travel-history.component';


interface OtherTravellers {
  id: number;
  Name: string;
  Age: number;
  Meal_Type: string;
}
@Component({
  selector: 'app-lead-profile',
  standalone: true,
  imports: [CommonModule, AgGridAngular, ReactiveFormsModule, RouterModule, TravelHistoryComponent],
  templateUrl: './lead-profile.component.html',
  styleUrl: './lead-profile.component.scss'
})
export class LeadProfileComponent {
  page = 'Profile';
  currentTab: string = 'profile';
  basicForm: FormGroup | any;
  advancedForm: FormGroup | any;
  advancedExpanded: boolean = false;
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
    this.basicForm = this.formBuilder.group({
      givenname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      reference : [''],
      contactNumber : [''],
      
    });

    this.advancedForm = this.formBuilder.group({
      firstName: [''],
      lastName : [''],
      altContactNumber : [''],
      baseLocation : [''],
      mealType:['']
    });
  }
  toggleAccordion(collapseId: string) {
    if (collapseId === 'advancedCollapse') {
      this.advancedExpanded = !this.advancedExpanded;
    }
  }
  title = 'trip-details-table';
  
  otherTravellers: OtherTravellers[] = [
    {
      id: 1,
      Name: 'Shankar',
      Age: 35,
      Meal_Type: 'Veg'
    },
    {
      id: 2,
      Name: 'Shashi',
      Age: 14,
      Meal_Type: 'Veg'
    },
    {
      id: 3,
      Name: 'Prabhakar',
      Age: 10,
      Meal_Type: 'Veg',
    },

  ]


  columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'Name', sortable: true, filter: true, width: 170,wrapText: true} ,
    { field: 'Age', sortable: true, filter: true,width: 120,wrapText: true},
    { field: 'Meal_Type', sortable: true, filter:true,width: 170,wrapText: true}
  ];
  

  rowData: OtherTravellers[] = this.otherTravellers;

  
  gridOptions = {
    icons: {
      sortAscending: '<i class="fas fa-sort-alpha-up"></i>', // FontAwesome icon
      sortDescending: '<i class="fas fa-sort-alpha-down"></i>',
      // other icons...
    }
  };
  

}