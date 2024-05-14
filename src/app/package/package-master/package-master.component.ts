import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowDragEndEvent } from 'ag-grid-community';
import { EventCellRendererComponent } from '../event-cell-renderer';
import { GridButtonComponent } from '../../action-event/gridbutton-renderer.component';
import { DataService } from '../../data.service';


@Component({
  selector: 'app-package-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NgMultiSelectDropDownModule,
    AgGridModule, EventCellRendererComponent],
  providers: [DataService],
  templateUrl: './package-master.component.html',
  styleUrl: './package-master.component.scss'
})
export class PackageMasterComponent implements OnInit {

  selectedPackage: any;
  packageForm: any;
  taglist: any[] = []
  rowData: any[] = []
  location: any[] = []
  tpackages: any[] = []
  packageDetails: any;
  tpackagedtail: any[] = []
  showGrid: boolean = false;
  public editOnLoad: boolean = false;
  dropdownSettings: IDropdownSettings = {};
  selecteddata: any;
  editData: any;
  public frameworkComponents: any;
  public gridOptions!: GridOptions;
  public gridApi!: GridApi;
  data: any;
  packagedata: any;

  constructor(private formBuilder: FormBuilder, private dataservice: DataService, private router: Router
    , private route: ActivatedRoute) {
    this.initializeForm();
    this.gridOptions = {
      suppressClickEdit: true,
      suppressDragLeaveHidesColumns: false,
      suppressMovableColumns: true
    };

  }

  ngOnInit(): void {
    this.getuserlocation()
    this.gettagsMaster()
    this.initializeGrid();
    if (this.route.snapshot.params['editData']) {
      this.editData = JSON.parse(this.route.snapshot.params['editData']);
      this.rowData = this.editData.itinerary
    }


    if (this.editData) {
      this.fillEditInfo();
    }
    this.dropdownSettings = {
      allowSearchFilter: true,
      singleSelection: false,
      idField: 'tagId',
      textField: 'tagName',
      enableCheckAll: true,
      itemsShowLimit: 9,

    };
  }


  initializeForm(): void {
    this.packageForm = this.formBuilder.group({
      packageDetails: this.formBuilder.group({
        packageCode: [''],
        packageName: [''],
        packageDuration: [''],
        tagIds: [''],
        packageType: [''],
        subscriptionType: [''],
        packageId: ['']
      }),

      itinerary: this.formBuilder.array([])
    });
  }




  getuserlocation() {
    this.dataservice.getLocations().subscribe(location => {
      this.location = location.locationDetails;

    })
  }
  get itinerary(): FormArray {
    return this.packageForm.get('itinerary') as FormArray;
  }




  // addNewItineraryItem(): void {
  //   const newItem = {
  //     eventDay: '',
  //     locationId: '',
  //     locationName: '',
  //     eventDescription: '',
  //     isNew: true ,
  //     packageId:'',
  //     packageName:'',
  //   };
  //   const packageDetails = this.packageForm.get('packageDetails').value;
  //   if (packageDetails) {
  //     newItem.packageId = packageDetails.packageId;
  //     newItem.packageName = packageDetails.packageName;
  //   } else {
  //     console.warn('packageDetails is not defined for packageId and packageName.');
  //   }
  //   this.rowData.push(newItem);

  //   const transaction = {
  //     add: [newItem]
  //   };

  //   if (this.gridApi) {
  //     this.gridApi.applyTransaction(transaction);
  //   }
  // }


  onGridReady(params: GridReadyEvent) {

    console.log('called')
    this.gridApi = params.api;

    setTimeout(() => {
      let shouldHideColumn = true;

      this.gridApi.forEachNode((node) => {
        if (node.data.itineraryId) {
          shouldHideColumn = false;
        } else {
          shouldHideColumn = true
        }
      });

      this.gridApi.setColumnsVisible(['Drag'], !shouldHideColumn);
    }, 100);
  }




  onSubmit() {
    if (this.packageForm.valid) {
      const packageDetails = this.packageForm.get('packageDetails').value;
      packageDetails.packageId = this.packageForm.value.packageDetails?.packageId ? this.packageForm.value.packageDetails?.packageId : ''

      if (typeof packageDetails.tagIds === 'object') {
        packageDetails.packageCategoryIds = packageDetails.tagIds.map((cat: any) => cat.tagId).toString();
        packageDetails.packageCategory = packageDetails.tagIds.map((cat: any) => cat.tagName).toString();

      }

      delete packageDetails.tagIds;
      console.log(packageDetails)

      this.dataservice.savePackage(packageDetails).subscribe({
        next: (data) => {
          console.log('Package saved, response:', data);
          const packageId = data.packageId;

          this.packageForm.get('packageDetails').patchValue({
            packageId: packageId,
          });
          console.log(this.packageForm)

        },
        error: (error) => {
          console.error('Error saving package:', error);
        }
      });

    }
  }

  openAddPackageModal() {
    this.router.navigate(['package-list', {}], { skipLocationChange: true });
  }

  gettagsMaster() {
    this.dataservice.getTags().subscribe((data: any) => {
      this.taglist = data.tagsDetails;
      console.log(this.taglist);
    }
    )
  }

  fillEditInfo() {
    this.dataservice.getTags().subscribe((data: any) => {
      this.taglist = data.tagsDetails;

      if (this.editData && this.editData.packageDetails && this.editData.packageDetails.length > 0) {
        const firstPackageDetail = this.editData.packageDetails[0];

        const categoryIdsArray = firstPackageDetail.packageCategoryIds.split(',');
        const tagIds = this.taglist.filter(tags => categoryIdsArray.includes(tags.tagId.toString()));

        this.packageForm.get('packageDetails').patchValue({
          packageCode: firstPackageDetail.packageCode,
          packageName: firstPackageDetail.packageName,
          packageDuration: firstPackageDetail.packageDuration,
          tagIds: tagIds,
          packageType: firstPackageDetail.packageType,
          subscriptionType: firstPackageDetail.subscriptionType,
          packageId: firstPackageDetail.packageId
        });
      }
    });

  }



  public columnDefs: ColDef[] = [];



  public defaultColDef = {
    flex: 1,
    minWidth: 100,
    editable: false,
    resizable: true,
  };



  initializeGrid() {

    this.columnDefs = [
      {
        field: '',
        pinned: true,
        width: 0,
        minWidth: 50,
        sortable: false,

        rowDrag: (params) => {
          return params.node.data.itineraryId;
        },

      }
      ,

      {
        cellRenderer: EventCellRendererComponent,
        field: 'Itinerary Details',
        autoHeight: true,
        sortable: false,
        cellRendererParams: {
          onSaveClick: this.onSaveButtonClicked.bind(this),
          onAddItem: (index: number) => this.addNewItemBelow(index),
          onRemoveItem: (data: any) => this.removeItem(data),
        }
      }



    ];

    this.frameworkComponents = {
      gridButtonComponent: GridButtonComponent,
      eventCellRenderer: EventCellRendererComponent
    };
  }

  addNewItemBelow(index: any): void {
    const newItem = { eventDay: '', locationName: '', eventDescription: '', itineraryId: '', packageId: '', packageName: '' };
    const packageDetails = this.packageForm.get('packageDetails').value;
    console.log(packageDetails)
    if (packageDetails) {
      newItem.packageId = packageDetails.packageId;
      newItem.packageName = packageDetails.packageName;
    } else {
      console.warn('packageDetails is not defined for packageId and packageName.');
    }
    this.rowData.splice(index + 1, 0, newItem);

    if (this.gridApi) {
      this.gridApi.applyTransaction({
        add: [newItem],
        addIndex: index + 1
      })
    }


    // if(this.gridApi){
    //   this.updatedisplayorder(this.gridApi)
    // }
    console.log(this.gridApi)
  }

  removeItem(dataToRemove: any): void {
    console.log(dataToRemove)
    const rowIndex = this.rowData.findIndex(row => row.id === dataToRemove.id);
    if (rowIndex > -1) {
      this.rowData.splice(rowIndex, 1);
      this.gridApi.applyTransaction({ remove: [dataToRemove] });
    }
    const IIds = dataToRemove.itineraryId;
    console.log(IIds)
    if (IIds) {
      let isConfirmed = confirm("Are you sure you want to delete this itinerary detail from database?");
      if (isConfirmed) {
        this.dataservice.deleteItinerary(IIds).subscribe({
          next: (data) => {
            // this.rowData.splice(rowIndex, 1);
            alert("Itinerary detail successfully deleted.");
          },
          error: (error) => {
            alert("An error occurred while deleting the itinerary detail.");
            console.error('Error:', error);
          }
        });
      }
    } else {
      this.itinerary.removeAt(dataToRemove);
    }
    // this.updatedisplayorder(this.gridApi)
  }



  onRowDragEnd(event: RowDragEndEvent): void {
    console.log("onRowDragEnd", event);
    const api = event.api;
    this.updatedisplayorder(api)
  }



  updatedisplayorder(api: any) {
    const allRowData: any[] = [];
    api.forEachNodeAfterFilterAndSort((node: any, index: any) => {
      node.data.displayOrder = index + 1;
      allRowData.push({ ...node.data });
    });

    console.log(allRowData);

    this.dataservice.saveItinerary(allRowData).subscribe({
      next: (data) => {
        console.log('Itinerary added/updated', data);
        setTimeout(() => {
          this.rowData = data.itineraryIds;
        }, 500);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }



  onSaveButtonClicked(params: any): void {
    console.log("Data received in onSaveButtonClicked:", params);
    const allRowData: any[] = [];
    const api = this.gridApi
    api.forEachNodeAfterFilterAndSort((node: any, index: any) => {
      node.data.displayOrder = index + 1;
      allRowData.push({ ...node.data });

    });
    const payload = allRowData

    console.log(payload)
    this.dataservice.saveItinerary(payload).subscribe({
      next: (data) => {
        console.log('Itenarary added/updated', data)
        this.rowData = data.itineraryIds
        this.gridApi.setColumnsVisible(['Drag'], true);
      },
      error: (error) => {
        console.error('Error:', error)
      }
    });

  }


}