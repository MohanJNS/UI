import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowDragEndEvent } from 'ag-grid-community';
import { TransportCellRendererComponent } from '../transport-cell-renderer';
import { DataService } from '../../data.service';



@Component({
  selector: 'app-transport-master',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule, 
            AgGridModule,TransportCellRendererComponent],
  providers:[DataService],
  templateUrl: './transport-master.component.html',
  styleUrl: './transport-master.component.scss'
})
export class TransportMasterComponent implements OnInit{

  constructor(private fb:FormBuilder,private dataservice:DataService,private router:Router,
    private route:ActivatedRoute){}

  transportForm: FormGroup | any;
  location: any[] = [];
  objkeys:any ;
  selecteddata: any;
  editOnLoad: boolean = false;
  rowData:any[]=[]
  initialTransportName: string = "";
  initialLocationId: string = "";
  showSuccess = false;
  showFailure = false;
  message: string = ''; 
  public gridOptions!: GridOptions;
  public gridApi!: GridApi;
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
        cellRenderer: TransportCellRendererComponent,
        field: 'Transport Details',
        autoHeight: true,
        sortable: false,
        cellRendererParams: {
          onSaveClick: this.onSaveButtonClicked.bind(this),
          onAddItem: (index: number) => this.addNewItemBelow(index),
          onRemoveItem: (data: any) => this.removeItem(data)
        }
      }
    ];
  }
  onGridReady(params: GridReadyEvent) {
    console.log('called');
    this.gridApi = params.api;
    setTimeout(() => {
      let shouldHideColumn = true;
  
      this.gridApi.forEachNode((node) => {
        if (node.data.vehicleId) { 
          shouldHideColumn = false;
        }else{
          shouldHideColumn = true
        }
      });
  
      this.gridApi.setColumnsVisible(['Drag'], !shouldHideColumn);
    },100 ); 
    if(!this.editOnLoad){
      this.addNewItemBelow(0);
    }
  }
  ngOnInit(): void {
    this.getPlace()
    this.transportForm = this.fb.group({
      transportName: ['', Validators.required],
      locationId:[],
      transportId:[null],
      locationName:['']

    });
    this.gridOptions = {
      suppressClickEdit: true, 
      suppressDragLeaveHidesColumns:false,
      suppressMovableColumns:true
    };
    this.initializeGrid();
    
   if(this.transportForm.get('transportInfo')){
    this.objkeys = Object.keys(this.transportForm?.get('transportInfo')?.value);      
  }


  if(this.route.snapshot.params['editData']){    
    let data = JSON.parse(this.route.snapshot.params['editData']); 
    this.selecteddata = data.transportDetails;

    this.rowData = this.selecteddata.vehicleDetails;    
  }

   if(this.selecteddata){
    this.editOnLoad=true;
    this.fillEditInfo();
  }
  }




  onSubmit() {
    if (this.transportForm.valid) {
      const formvalues = this.transportForm.value;
      formvalues.locationId = +formvalues.locationId;
      if(formvalues.transportId != null)
        formvalues.transportId = +formvalues.transportId;
      
      console.log(formvalues);
      console.log("this.editOnLoad"+ this.editOnLoad +"formvalues.transportName" +
        formvalues.transportName +"this.initialTransportName" + this.initialTransportName +"formvalues.locationId" +
        formvalues.locationId +"this.initiallocationId" + this.initialLocationId)
      if(this.editOnLoad &&
         (formvalues.transportName != this.initialTransportName &&
         formvalues.locationId != this.initialLocationId))
        {
          if(confirm("Do you want to create a new Transport?")){
            formvalues.transportId = null;
          }
        }
        formvalues.locationName = this.location.filter((s:any) => s.locationId==formvalues.locationId)[0].locationName ;
      const agGridRowData = this.gridApi?.getDisplayedRowCount();

      //console.log(agGridRowData);
      
      this.gridApi.forEachNode((node) => {
        console.log(node.data);        
      });
      const vehiclesDetails: any[] = [];
      this.gridApi.forEachNodeAfterFilterAndSort((node: any, index: any) => {
        node.data.displayOrder = index + 1;
        node.data.price = +node.data.price;
       // if(formvalues.transportId == null)
       //   node.data.vehicleId = +node.data.vehicleId;
        vehiclesDetails.push({...node.data});
      });

      console.log(vehiclesDetails);
      
      const payload = {
        ...formvalues,
        vehiclesDetails
      };
      console.log(payload);
      // save to db
      this.dataservice.saveTransport(payload).subscribe({
        next: (data) => {
          console.log('Transport Details added/updated', data);
          if(formvalues.transportId == null){ 
              this.showSuccess = true;
              this.message = 'Transport Added successfully';
          }
          else{
              this.showSuccess = true;
              this.message = 'Transport Details Updated successfully';
          }
          this.transportForm.reset();
          this.rowData = [];
          this.addNewItemBelow(0);
          setTimeout(() => {
            this.showSuccess = false;
        }, 2000); 
        },
        error: (error) => {
          this.showFailure = true;
          console.error('Error:', error);
        }
      });
    }
    
  }

  openAddHotelModal(){
    this.router.navigate(['transport-list', { }], { skipLocationChange: true });
  }


  getPlace(){
    this.dataservice.getLocations().subscribe(location => {
      this.location = location.locationDetails;
      console.log(this.location)
  })}



  fillEditInfo() {
    if (this.selecteddata) {
      let transportDetails = this.selecteddata;
      this.transportForm.patchValue({
        transportId: transportDetails.transportId,
        transportName: transportDetails.transportName,
        locationId: transportDetails.locationId,      
      });
      this.initialTransportName = transportDetails.transportName;
      this.initialLocationId = transportDetails.locationId;
    }
  }
  /*
  onSaveButtonClicked(params: any): void {
      console.log("Data received in onSaveButtonClicked:", params);
      const allRowData: any[] = [];
      const api = this.gridApi
      api.forEachNodeAfterFilterAndSort((node:any, index:any) => {
        node.data.displayOrder = index + 1;
        allRowData.push({...node.data });
       
      }); 
      //params.updatedData.locationName = this.location.filter((s:any) => s.locationId==params.updatedData.locationId)[0].locationName ;
      
    const payload = allRowData
    //const payload = params.updatedData;
    console.log(payload)
    this.dataservice.saveVehicleDetails(payload).subscribe({
      next: (data) => {
        console.log('vehicle details added/updated', data)
        
        //this.rowData = data.itineraryIds
        this.gridApi.setColumnsVisible(['Drag'], true);
        
    },
      error: (error) =>{ console.error('Error:', error)
      }
      });
  }*/

  onSaveButtonClicked(params: any): void {
    console.log("Data received in onSaveButtonClicked:", params);
    const payload = params.updatedData;
    console.log(payload)
    this.dataservice.saveVehicleDetails(payload).subscribe({
        next: (data) => {
      console.log('vehicle details added/updated', data)
      
      //this.rowData = data.itineraryIds
        this.gridApi.setColumnsVisible(['Drag'], true);
      
      },
        error: (error) =>{ console.error('Error:', error)
        }
    });
}

  addNewItemBelow(index: any): void {
    const newItem = { vehicleName: '', vehicleType: '', price: '',remarks:'', vehicleId: '',transportId: ''};
    
    this.rowData.splice(index + 1, 0, newItem);
    if(this.gridApi){
      this.gridApi.applyTransaction({
        add: [newItem],
        addIndex: index + 1 
    })
  }
  
    console.log(this.gridApi)
  }
  addNewItem(): void {
    const newItem = { vehicleName: '', vehicleType:'', price: '',remarks:'', vehicleId: '',transportId:this.selecteddata?.transportId || ''};
    const index = this.gridApi?.getDisplayedRowCount();
    this.rowData.splice(index + 1, 0, newItem);
    if(this.gridApi){
      this.gridApi.applyTransaction({
        add: [newItem],
        addIndex: index + 1 
    })
  }
  
    console.log(this.gridApi)
  }
  
  removeItem(dataToRemove: any): void {
    console.log(dataToRemove.id)
    console.log(this.rowData)
    const rowIndex = this.rowData.findIndex(row => row.id === dataToRemove.id);
    //console.log(rowIndex)
    if (rowIndex > -1) {
      console.log(rowIndex)
      this.rowData.splice(rowIndex, 1);
      this.gridApi.applyTransaction({ remove: [dataToRemove] });
    }
    const IIds = dataToRemove.id;
   // console.log(IIds)
    if (IIds) {
      let isConfirmed = confirm("Are you sure you want to delete this vehicle details?");
      if (isConfirmed) {  
        /*this.dataservice.deleteItinerary(IIds).subscribe({
          next: (data) => {
            // this.rowData.splice(rowIndex, 1);
            alert("Vehicle details successfully deleted.");
          },
          error: (error) => {
            alert("An error occurred while deleting the vehicle details.");
            console.error('Error:', error);
          }
        });*/
      }
    } else {
    }
  }

}
