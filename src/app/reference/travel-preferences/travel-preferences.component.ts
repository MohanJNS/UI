import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef, ColGroupDef, DomLayoutType } from 'ag-grid-community';
import { AngularEditorModule } from '@kolkov/angular-editor';

@Component({
  selector: 'app-travel-preferences',
  standalone: true,
  imports: [CommonModule, AgGridAngular, ReactiveFormsModule, AngularEditorModule, RouterModule],
  templateUrl: './travel-preferences.component.html',
  styleUrl: './travel-preferences.component.scss'
})
export class TravelPreferencesComponent {
  travelPrefForm: FormGroup | any;
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.travelPrefForm = this.formBuilder.group({
      budget: [''],
      destination : [''],
      travelDatesFrom : [''],
      travelDatesTo : [''],
      numberOfDays:[''],
      adults : [''],
      kids: [''],
      accommodationType : [''],
      mealType :['']
    });
  }
}
