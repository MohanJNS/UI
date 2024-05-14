import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { Router, RouterModule } from '@angular/router';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { HttpClientModule } from '@angular/common/http';
import { TravelerComponent } from '../traveler/traveler.component';
import { ButtonRendererComponent } from '../../action-event/button-renderer.component';
import { DataService } from '../../data.service';
import { TravelerCellRendererComponent } from './traveler-cell-renderer';
import { CustomerService } from '../../leads/customer.service';




export interface Customer {
  customerId?: number;
  orgId: number;
  firstName: string;
  lastName: string;
  genderId: number;
  contactNumber: string;
  alternateNumber: string;
  emailId: string;
  place: string;
  address: string;
  stateCode: number;
  pincode: number;
  comments: string;
  updatedDate: Date;
  updatedBy: number;
}
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule,CommonModule,TravelerComponent,AgGridModule,RouterModule],
  providers:[DataService],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {

  @Input() custId: any;

  customerForm!: FormGroup;
  travelForm!: FormGroup;
  showAddTraveler: boolean = false;
  editMode: boolean = false;
  currentEditIndex: number = -1;
  public isBrowser: boolean = false;
  frameworkComponents: any;
  selecteddata: any;
  public rowData: any[] = [];
  public gridApi!: GridApi;
  public gridOptions!: GridOptions;
  id: any;
  constructor(@Inject(PLATFORM_ID) private platformId: any,
  private fb: FormBuilder,private dataservice:DataService,private router:Router,private customerService: CustomerService ) {   this.isBrowser = isPlatformBrowser(this.platformId);
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent
    }
  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      customerId:[''],
      orgId: [null],
      callName: [''],
      contactNumber: [''],
      emailId: [''],
      lastName: [''],
      genderId: [null],
      alternateNumber: [''],
      reference:[''],
      baseLocation:[''],
      place: [''],
      address: [''],
      stateCode: [null],
      pincode: [null],
      remarks: [''],
      updatedDate: [new Date()],
      updatedBy: [null]
    });

   this.getTravelerDetail(this.custId)
  }

  onSubmit(): void {
    if (this.customerForm.valid) {

      const formValues = {
        ...this.customerForm.value,
      }
      console.log('Customer Data:', formValues);
      this.dataservice.saveCustomer(formValues).subscribe({
        next: (data) => {
          console.log('Customer added/updated', data);
          this.rowData = data.travelerDetails;
          this.customerService.publishCustomerId(data.customerId);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
     }
  }

    public defaultColDef = {
    flex: 1,
    minWidth: 100,
    editable: false,
    resizable: true,
    
  };

  public columnDefs: ColDef[] = [
    {
      headerName: 'Traveler Details',
      cellRenderer: TravelerCellRendererComponent,
      field: 'Traveler Details',
      cellRendererParams: {
        onAddItem: (index: number) => this.addNewItemBelow(index),
        onSaveClick: this.onSaveButtonClicked.bind(this),
        // onEditClick: this.onEditButtonClicked.bind(this),
        onRemoveItem: this.removeItem.bind(this),
      },
      sortable: false,
      filter: false,
      resizable: true,
      autoHeight: true,
    },
  ];

  


  onGridReady(params: GridReadyEvent) {
    console.log('called')
    this.gridApi = params.api;
  }
  onEditButtonClicked(e: any) {
    console.log('onEditButtonClicked', e);
    this.selecteddata = e.rowData;
  
  }

  removeItem(dataToRemove: any): void {
    console.log(dataToRemove)
    dataToRemove.deleted = true;
    console.log(this.rowData)
    const rowIndex = this.rowData.findIndex((row: { id: any; }) => row.id === dataToRemove.id);
    if (rowIndex > -1) {
      this.rowData.splice(rowIndex, 1);
      this.gridApi.applyTransaction({ remove: [dataToRemove] });
    }

  }
  

  getTravelerDetail(customerId:number): void {
    this.dataservice.getCustomer(customerId).subscribe((data: any) => {
      console.log(data)
       this.rowData = data.travelerDetails;
       this.patchForm(data);
      
    });
  }

  patchForm(data: any): void {
    this.customerForm.patchValue({
      customerId:data.customerId,
      callName: data.callName,
      contactNumber: data.contactNumber,
      alternateNumber: data.alternateNumber,
      emailId: data.emailId,
      reference: data.reference,
      baseLocation: data.baseLocation,
      address: data.address,
      pincode: data.pincode,
      remarks: data.remarks
    });
  }
  addNewItemBelow(index: any): void {
    const newItem = {travelerId:'', firstName: '', lastName: '', genderId: '',travelerAge:'', contactNumber: '',profession: ''};
    
    this.rowData.splice(index + 1, 0, newItem);
    if(this.gridApi){
      this.gridApi.applyTransaction({
        add: [newItem],
        addIndex: index + 1 
    })
  }

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
  this.dataservice.updateTraveler(payload).subscribe({
    next: (data) => {
      console.log('Traveler added/updated', data)
    },
    error: (error) => {
      console.error('Error:', error)
    }
  });

}

}
