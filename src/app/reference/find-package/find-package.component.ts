import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef, ColGroupDef, DomLayoutType } from 'ag-grid-community';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { LeadUpdatesComponent } from '../lead-updates/lead-updates.component';
import { TravelPreferencesComponent } from '../travel-preferences/travel-preferences.component';


interface PackageInfo {
  id: number;
  isChecked: boolean;
  Name: string;
  Duration: string;
  Cost: string;
}
interface ItineraryInfo {
  Id: string;
  Day: string;
  Location: string;
  Places: string;
  Accomodation: string;
  Transport: string;
}
interface AddOnsInfo {
  Id: string;
  Name: string;
  Location: string;
  BasePrice: string;
  Accomodation: string;
  Transport: string;
}
@Component({
  selector: 'app-find-package',
  standalone: true,
  imports: [CommonModule, AgGridAngular, ReactiveFormsModule, AngularEditorModule, RouterModule,
    TravelPreferencesComponent, LeadUpdatesComponent
  ],
  templateUrl: './find-package.component.html',
  styleUrl: './find-package.component.scss'
})

export class FindPackageComponent {  
  page = 'Plan Travel';
  @Output() hideSearch: EventEmitter<boolean> = new EventEmitter<boolean>();
  public domLayout: DomLayoutType = 'autoHeight';
  searchForm: FormGroup | any;
  detailsForm: FormGroup | any;
  detailsExpanded: boolean = false;
  public headerHeight = 50;
  items = [
    { id: 1, visible: true, Name:'Golden Triangle', basePrice: '10,000', price1:'1000', price2: '2000',addOnsPrice: '1000', addOnsPrice1: '2000', addOnsPrice2: '1000' },
    { id: 2, visible: false, Name:'Udaipur - Jodhpur', basePrice: '10,000', price1:'1000', price2: '2000',addOnsPrice: '1000', addOnsPrice1: '2000', addOnsPrice2: '1000' },
    // Add more card objects as needed
  ];
  defaultColDef = {
    sortable: true,
    cellStyle: {'border-right-color': '#e2e2e2'},
    wrapHeaderText: true,
    autoHeight: true
  };

  
toggleAccordion(collapseId: string) {
  if (collapseId === 'detailsCollapse') {
    this.detailsExpanded = !this.detailsExpanded;
  }
}
  get editorContent() {
    return "My Notes";
    //return this.form.get('editorContent');
  }
  title = 'trip-details-table';
  
  packageInfo: PackageInfo[] = [
    {
      id: 1,
      Name: 'Golden Triangle',
      Duration: '4N 5D',
      Cost: '80,000 to 1,20,000',
      isChecked: true
    },
    {
      id: 2,
      Name: 'Jaisalmer - Jodhpur',
      Duration: '5N 6D',
      Cost: '1,20,000 to 1,50,000',
      isChecked: false
    },
    {
      id: 3,
      Name: 'Udaipur - Jaipur',
      Duration: '2N 3D',
      Cost: '50,000 to 80,000',
      isChecked:true
    },

  ]


  columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'Name', sortable: true, filter: true, width: 170,wrapText: true} ,
    { field: 'Duration', sortable: true, filter: true,width: 120,wrapText: true},
    { field: 'Cost', sortable: true, filter:true,width: 170,wrapText: true}
  ];
  

  rowData: PackageInfo[] = this.packageInfo;
  itineraryInfo: ItineraryInfo[] = [
    {
      Id:'0',
      Day: 'Day1',
      Location: 'Jaipur',
      Places: 'Place1, Place2',
      Accomodation: '',
      Transport: ''
    },
    {
      Id:'1',
      Day: 'Day2',
      Location: 'Jaipur',
      Places: 'Place1, Place2',
      Accomodation: '',
      Transport: ''
    },
    {
      Id:'2',
      Day: 'Day3',
      Location: 'Agra',
      Places: 'Place1, Place2',
      Accomodation: '',
      Transport: ''
    },
    {
      Id:'3',
      Day: 'Day4',
      Location: 'Delhi',
      Places: 'Place1, Place2',
      Accomodation: '',
      Transport: ''
    },
    {
      Id: '4',
      Day: 'Day5',
      Location: 'Delhi',
      Places: 'Place1, Place2',
      Accomodation: '',
      Transport: ''
    }
  ];
  columnItineraryDefs: (ColDef | ColGroupDef)[] = [
    { field: 'Day', sortable: true, filter: true, width: 170,wrapText: true} ,
    { field: 'Location', sortable: true, filter: true,width: 120,wrapText: true},
    { field: 'Places', sortable: true, filter:true,width: 170,wrapText: true},
    { field: 'Accomodation', sortable: true, filter:true,width: 170,wrapText: true},
    { field: 'Transport', sortable: true, filter:true,width: 170,wrapText: true}
  ];
  

  rowItineraryData: ItineraryInfo[] = this.itineraryInfo;

  addOnsInfo: AddOnsInfo[] = [
    {
      Id: "1",
      Name: 'Pushkar',
      Location: 'Jaipur',
      BasePrice: '1000',
      Accomodation: '',
      Transport: ''
    },
    {
      Id: "2",
      Name: 'Jodhpur',
      Location: 'Jodhpur',
      BasePrice: '3000',
      Accomodation: '',
      Transport: ''
    },
    {
      Id: "3",
      Name: 'Madhura',
      Location: 'Jaipur',
      BasePrice: '1000',
      Accomodation: '',
      Transport: ''
    },
    {
      Id: "4",
      Name: 'Fort',
      Location: '',
      BasePrice: '1000',
      Accomodation: '',
      Transport: ''
    },    
  ];
  columnAddOnsDefs: (ColDef | ColGroupDef)[] = [
    { field: 'Name', sortable: true, filter: true, width: 170,wrapText: true} ,
    { field: 'Location', sortable: true, filter: true,width: 120,wrapText: true},
    { field: 'Base Price', sortable: true, filter:true,width: 170,wrapText: true},
    { field: 'Accomodation', sortable: true, filter:true,width: 170,wrapText: true},
    { field: 'Transport', sortable: true, filter:true,width: 170,wrapText: true}
  ];
  

  rowAddOnsData: AddOnsInfo[] = this.addOnsInfo;

  gridOptions = {
    icons: {
      sortAscending: '<i class="fas fa-sort-alpha-up"></i>', // FontAwesome icon
      sortDescending: '<i class="fas fa-sort-alpha-down"></i>',
      // other icons...
    }
  };
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      isDomestic: ['Domestic', [Validators.required, Validators.email]],
      travelType : ['Travel Type'],
      state : ['State/ Region'],
      placeChoice:['Preference'],
      stateExclude:[''],
      placeChoiceExclude:['']
    });   

    this.detailsForm = this.formBuilder.group({
      firstName: [''],
      lastName : [''],
      altContactNumber : [''],
      baseLocation : [''],
      mealType:['']
    });
  }
  handleChange(event: any, packageId: number) {
    console.log('Checkbox state:', event.target.checked);
    // Perform actions based on the checkbox state
  }
  toggleItem(item: any) {
    console.log(item);
    this.items.forEach(i => {
        i.visible = (i === item && !i.visible);
    });
  }
  
  navigateToCustomPackage() {
    //this.hideSearch.emit(true);
    this.router.navigate(['/custom-package']);
  }
}
