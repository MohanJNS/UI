import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef, ColGroupDef, DomLayoutType } from 'ag-grid-community';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { CustomizePackageComponent } from '../customize-package/customize-package.component';
import { FindPackageComponent } from '../find-package/find-package.component';

interface PackageInfo {
  id: number;
  Name: string;
  Duration: string;
  Cost: string;
}
interface ItineraryInfo {
  Day: string;
  Location: string;
  Places: string;
  Accomodation: string;
  Transport: string;
}
interface AddOnsInfo {
  Name: string;
  Location: string;
  BasePrice: string;
  Accomodation: string;
  Transport: string;
}

@Component({
  selector: 'app-plan-travel',
  standalone: true,
  imports: [CommonModule, AgGridAngular, ReactiveFormsModule, AngularEditorModule, RouterModule, 
            FindPackageComponent,CustomizePackageComponent],
  templateUrl: './plan-travel.component.html',
  styleUrl: './plan-travel.component.scss'
})
export class PlanTravelComponent {
  page = 'Plan Travel';
  showsearch = true;
  public domLayout: DomLayoutType = 'autoHeight';
  searchForm: FormGroup | any;
  travelPrefForm: FormGroup | any;
  notesForm: FormGroup | any;
  detailsForm: FormGroup | any;
  detailsExpanded: boolean = false;
  public headerHeight = 50;
  showMenuCard: boolean = false;
  isCustomizingPackage = false;
  defaultColDef = {
    sortable: true,
    cellStyle: {'border-right-color': '#e2e2e2'},
    wrapHeaderText: true,
    autoHeight: true
  };
  editorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '120px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: false,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
    
      // other fonts here
    ],
    toolbarHiddenButtons: [
      [
        // 'undo',
        // 'redo',
        // 'bold',
        // 'italic',
        // 'underline',
        // 'strikeThrough',
        // 'subscript',
        // 'superscript',
        // 'justifyLeft',
        // 'justifyCenter',
        // 'justifyRight',
        // 'justifyFull',
        // 'indent',
        // 'outdent',
        // 'insertUnorderedList',
        // 'insertOrderedList',
        // 'heading',
        // 'fontName'
      ],
      [
        // 'fontSize',
        // 'textColor',
        // 'backgroundColor',
        // 'customClasses',
        // 'link',
        // 'unlink',
        // 'insertImage',
        // 'insertVideo',
        // 'insertHorizontalRule',
        // 'removeFormat',
        // 'toggleEditorMode'
      ]
    ]
  }
  
toggleAccordion(collapseId: string) {
  if (collapseId === 'detailsCollapse') {
    this.detailsExpanded = !this.detailsExpanded;
  }
}
toggleMenuCard() {
  this.showMenuCard = !this.showMenuCard;
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
      Cost: '80,000 to 1,20,000'
    },
    {
      id: 2,
      Name: 'Jaisalmer - Jodhpur',
      Duration: '5N 6D',
      Cost: '1,20,000 to 1,50,000'
    },
    {
      id: 3,
      Name: 'Udaipur - Jaipur',
      Duration: '2N 3D',
      Cost: '50,000 to 80,000'
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
      Day: 'Day1',
      Location: 'Jaipur',
      Places: 'Place1, Place2',
      Accomodation: '',
      Transport: ''
    },
    {
      Day: 'Day2',
      Location: 'Jaipur',
      Places: 'Place1, Place2',
      Accomodation: '',
      Transport: ''
    },
    {
      Day: 'Day3',
      Location: 'Agra',
      Places: 'Place1, Place2',
      Accomodation: '',
      Transport: ''
    },
    {
      Day: 'Day4',
      Location: 'Delhi',
      Places: 'Place1, Place2',
      Accomodation: '',
      Transport: ''
    },
    {
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
      Name: 'Pushkar',
      Location: 'Jaipur',
      BasePrice: '1000',
      Accomodation: '',
      Transport: ''
    },
    {
      Name: 'Jodhpur',
      Location: 'Jodhpur',
      BasePrice: '3000',
      Accomodation: '',
      Transport: ''
    },
    {
      Name: 'Madhura',
      Location: 'Jaipur',
      BasePrice: '1000',
      Accomodation: '',
      Transport: ''
    },
    {
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
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      isDomestic: ['Domestic', [Validators.required, Validators.email]],
      travelType : ['Travel Type'],
      state : ['State/ Region'],
      placeChoice:['Preference']
      
    });

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
    this.notesForm = this.formBuilder.group({
      nextAction: [''],
      editorContent: [''],
      nextActionTime: ['']
    });
    this.detailsForm = this.formBuilder.group({
      firstName: [''],
      lastName : [''],
      altContactNumber : [''],
      baseLocation : [''],
      mealType:['']
    });
  }
  changeCustomize($event: any){
    this.isCustomizingPackage = $event;
  }
}

