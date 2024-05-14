import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CustomerComponent } from '../../customer/customer/customer.component';
import { DataService } from '../../data.service';
import { CustomerService } from '../customer.service';
import { PlanTravelComponent } from '../../reference/plan-travel/plan-travel.component';
import { FindPackageComponent } from '../../reference/find-package/find-package.component';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { error } from 'console';

interface PackageInfo {
  id: number;
  isChecked: boolean;
  Name: string;
  Duration: string;
  Cost: string;
}



interface Entry {
  name: string;
  email: string

}

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [CommonModule, NgMultiSelectDropDownModule, ReactiveFormsModule, RouterLink, AngularEditorModule,
    HttpClientModule, CustomerComponent, PlanTravelComponent, FindPackageComponent,
  ],
  providers: [DataService],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss'
})
export class LeadsComponent implements OnInit {

  allTags: string[] = [];
  showMenuCard: boolean = false;
  custId!: number;
  dropdownSettings = {};
  dropdownSettings1 = {};
  places = [
    {
      "placeid": 1,
      "Place": "Kashmir",
      "Tags": ["North India", "Snow", "Relaxing"],
      "Duration": "3N/4D",
      "Details": {
        "Description": "Known for its breathtaking landscapes...",
        "Activities": ["Shikara ride on Dal Lake", "Visit to Gulmarg"],
        "Best Time to Visit": "March to August...",
        "Travel Tips": "Carry woolens, even in summer...",
        "How to Reach": "Srinagar airport is well connected...",
        "Accommodation Options": ["Luxury: The Lalit Grand Palace", "Budget: Hotel Pine Spring"],
        "Local Cuisine": "Must try Wazwan...",
        "Nearby Attractions": ["Pahalgam", "Amarnath Cave"]
      }

    },
    {
      "placeid": 2,
      "Place": "Kashi",
      "Tags": ["North India", "Pilgrimage"],
      "Duration": "3N/4D"
    },
    {
      "placeid": 3,
      "Place": "Delhi",
      "Tags": ["North India", "Site Seeing"],
      "Duration": "3N/4D"
    },
    {
      "placeid": 4,
      "Place": "Ooty",
      "Tags": ["South India", "Hill Station"],
      "Duration": "3N/4D"
    },
    {
      "placeid": 5,
      "Place": "Goa",
      "Tags": ["South India", "Coastal"],
      "Duration": "3N/4D"
    },
    {
      "placeid": 6,
      "Place": "Chennai",
      "Tags": ["South India", "Coastal"],
      "Duration": "3N/4D"
    },
    {
      "placeid": 7,
      "Place": "Rameshwaram",
      "Tags": ["South India", "Coastal", "Pilgrimage"],
      "Duration": "3N/4D"
    },
    {
      "placeid": 8,
      "Place": "Bangalore",
      "Tags": ["South India", "Relaxing", "Site Seeing"],
      "Duration": "3N/4D"
    }
  ]

  filteredPlaces: any[] = [];
  selectedTags: string[] = [];
  selectedPlaces: any[] = [];
  selectedPlaceIds: any[] = [];
  leadForm: FormGroup | any;
  searchForm: FormGroup | any;
  form: any;
  customerId!: any;

  packageCategory: any[] = [];
  packageDetails: any[] = [];
  packagetype: any[] = [];
  statemaster: any[] = [];
  category: any;
  states: any[] = [];
  regions: any[] = [];
  packages: any[] = [];
  allPackages: any[] = [];
  filteredPackages: any[] = [];
  selectedType: any;
  travelType: any;
  selectedPackages: any[] = [];

  activeTab: number = 0;
  constructor(private fb: FormBuilder, private dataservice: DataService, private route: ActivatedRoute, private customerService: CustomerService) {
    this.createForm();

    this.places.forEach(place => {
      place.Tags.forEach(tag => {
        if (!this.allTags.includes(tag)) {
          this.allTags.push(tag);
        }
      });
    });


  }


  testform!: FormGroup

  ngOnInit(): void {

    this.customerService.currentCustomerId.subscribe(id => {
      this.leadForm.patchValue({
        customerId: id
      });
    });


    this.getPackageMasterData()

    this.searchForm = this.fb.group({
      isDomestic: ['Domestic', [Validators.required, Validators.email]],
      states: [[]],
      travelType: [''],
      // stateControl: [],
      packageCategory: [[]],
      // placeChoice:[''],
      // stateExclude:[''],
      // placeChoiceExclude:['']
    });


    this.dropdownSettings = {
      allowSearchFilter: true,
      singleSelection: false,
      idField: 'stateCode',
      textField: 'stateName',
      enableCheckAll: true,
      itemsShowLimit: 15,
    };

    this.dropdownSettings1 = {
      allowSearchFilter: true,
      singleSelection: false,
      idField: 'categoryId',
      textField: 'categoryName',
      enableCheckAll: true,
      itemsShowLimit: 15,
    };

    this.searchForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }



  createForm() {
    this.leadForm = this.fb.group({
      // name: ['', Validators.required],
      // contactNumber: [''],
      // email: [''],
      // destination: [''],
      customerId: [''],
      travelBudget: [''],
      travelDateFrom: [''],
      travelDateTo: [''],
      numberOfDays: [''],
      // filterTag: [''],
      adults: [''],
      kids: [''],
      accommodationType: [''],
      mealType: [''],
      packageNames: [''],
      nTravelers: [''],
      mealPreference: [''],
      transportPreference: [''],
      nDays: [''],
      comments: new FormControl('')

    });

  }

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
      isChecked: true
    },

  ]

  handleChange(event: any, packageId: number) {
    console.log('Checkbox state:', event.target.checked);
    // Perform actions based on the checkbox state
  }


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
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },

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
  };


  get editorContent() {
    return this.form.get('editorContent');
  }




  Mail() {
    console.log('clicked')
    console.log(this.searchForm.value)
  }

  onSavelead() {
    if (this.leadForm.valid) {
      // const filterTagValue = Array.from(this.selectedPlaceIds);
      const submissionData = {
        ...this.leadForm.value,

        // filterTag: filterTagValue
      }
      console.log(submissionData)
      //   this.dataservice.saveTravellead(submissionData).subscribe({
      //     next: (data) => {
      //       console.log('Customer added/updated', data);
      //     },
      //     error: (error) => {
      //       console.error('Error:', error);
      //     }
      //   });
      //   console.log(submissionData)
    }
  }




  toggleMenuCard() {
    this.showMenuCard = !this.showMenuCard;
  }




  getPackageMasterData() {
    this.dataservice.getPackageData().subscribe({
      next: (data) => {
        console.log(data)
        this.packageCategory = data.packageCategory;
        this.packageDetails = data.packageDetails;
        this.packagetype = data.packagetype;
        this.statemaster = data.statemaster;
        this.filteredPackages = [...this.packageDetails];
        console.log(this.packageCategory);
        console.log(this.packageDetails);
        console.log(this.packagetype);
        console.log(this.statemaster)
        //  this.organizeData();


      },
      error: () => {
        console.log('error in fetching details')
      }

    })

  }





  applyFilters() {
    let results = this.packageDetails;

    // Filter by travel type
    console.log(this.searchForm.value)
    if (this.searchForm.value.travelType !== "") {
      results = results.filter(pkg => pkg.package.packageType === this.searchForm.value.travelType);
    }

    //   if (this.searchForm.value.states.length>0) {
    //     let filteredStates:number[] = this.searchForm.value.states
    //     .map((state: any) => state.stateCode);
    //     results = results.filter(pkg => {
    //       return pkg.package.stateRegionIds !== null;
    //     });

    //     results = results.filter(pkg => {
    //       let stateCodes: number[] = pkg.package.stateRegionIds.split(',').map((id:any) => parseInt(id, 10));
    //     return stateCodes.some((id: any)=>filteredStates.includes(id))

    //     })

    // }


    //   if (this.searchForm.value.packageCategory.length>0) {
    //     let filterCategories:number[] = this.searchForm.value.packageCategory
    //     .map((category: any) => category.categoryId);
    //     results = results.filter(pkg => {
    //       return pkg.package.packageCategoryIds !== null;
    //     });

    //     results = results.filter(pkg => {
    //       let categoryIds: number[] = pkg.package.packageCategoryIds.split(',').map((id:any) => parseInt(id, 10));
    //     return categoryIds.some((id: any)=>filterCategories.includes(id))

    //     })

    // }'

    if (this.searchForm.value.states.length > 0) {
      const filteredStates: number[] = this.searchForm.value.states
        .map((state: any) => state.stateCode);

      results = results.filter(pkg =>
        pkg.package.stateRegionIds !== null &&
        pkg.package.stateRegionIds.split(',').map((id: string) => parseInt(id, 10))
          .some((id: number) => filteredStates.includes(id))
      );
    }


    if (this.searchForm.value.packageCategory.length > 0) {
      const filterCategories: number[] = this.searchForm.value.packageCategory
        .map((category: any) => category.categoryId);

      results = results.filter(pkg =>
        pkg.package.packageCategoryIds !== null &&
        pkg.package.packageCategoryIds.split(',').map((id: string) => parseInt(id, 10))
          .some((id: number) => filterCategories.includes(id))
      );
    }


    this.filteredPackages = results;
    console.log(this.filteredPackages)
  }



  onPackageSelected(checked: boolean, packageId: any) {
    if (checked) {

      const selectedPackage = this.packageDetails.find(pkg => pkg.package.packageId === packageId);
      console.log(selectedPackage)
      if (selectedPackage && !this.selectedPackages.some(pkg => pkg.package.packageId === packageId)) {
        selectedPackage.itinerary = selectedPackage.itinerary || [];
        this.selectedPackages.push(selectedPackage);
        console.log(selectedPackage)
        if (this.selectedPackages.length === 1) {
          this.activeTab = 0;
        }
      }
    } else {
      this.selectedPackages = this.selectedPackages.filter(pkg => pkg.package.packageId !== packageId);
      if (this.activeTab >= this.selectedPackages.length) {
        this.activeTab = this.selectedPackages.length - 1;
      }
    }
  }


  onItemSelect(event: any) {
    console.log(this.searchForm.value)
  }


  onSelectAll(items: any) {
    console.log(this.searchForm.value)
  }




}
