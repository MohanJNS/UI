import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../data.service';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';
import { TravelerCellRendererComponent } from '../customer/traveler-cell-renderer';

@Component({
  selector: 'app-traveler',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,AgGridModule],
  providers:[DataService],
  templateUrl: './traveler.component.html',
  styleUrl: './traveler.component.scss'
})
export class TravelerComponent {


  // travelForm!: FormGroup;
  // constructor(private fb:FormBuilder,private dataservice:DataService,private router:Router,
  //   private route:ActivatedRoute ){}
  
  // ngOnInit(): void {
  //     this.travelForm = this.fb.group({
  //     firstName: '',
  //     lastName: '',
  //     contactNumber: '',
  //     mealPreference: '',
  //     otherTravelers: this.fb.array([])
  //   });

  //   if(this.route.snapshot.params['selecteddata']){
  //     this.selecteddata = JSON.parse(this.route.snapshot.params['selecteddata']);
  //   }
  //   console.log(this.selecteddata)
  //   this.initializeGrid();
  // }

  // onSaveTraveler() {
  //   console.log(this.travelForm.value);
  // }


  // selecteddata: any;
  // editOnLoad: boolean = false;
  // rowData:any[]=[]
  // public gridOptions!: GridOptions;
  // public gridApi!: GridApi;
  // public columnDefs: ColDef[] = [];

  // public defaultColDef = {
  //   flex: 1,
  //   minWidth: 100,
  //   editable: false,
  //   resizable: true,
  // };



  // initializeGrid() {
  //   this.columnDefs = [
  //     {
  //       cellRenderer: TravelerCellRendererComponent,
  //       field: 'Traveler Details',
  //       autoHeight: true,
  //       sortable: false,
  //       cellRendererParams: {
  //         onEditClick: this.onEditButtonClicked.bind(this),
  //         onSaveClick: this.onSaveButtonClicked.bind(this),
  //         onAddItem: (index: number) => this.addNewItemBelow(index),
  //         // onRemoveItem: (data: any) => this.removeItem(data)
  //       }
  //     }
  //   ];
  // }
  // onGridReady(params: GridReadyEvent) {
  //   console.log('called');
  //   this.gridApi = params.api;


  //   // this.addNewItemBelow(0);

  // }

  // onEditButtonClicked(e: any) {
  //   console.log('onEditButtonClicked', e);
  //   this.selecteddata = e.rowData;
  //   this.addNewItem()


  // }

 

  // onSaveButtonClicked(params: any): void {
  // }
  // addNewItemBelow(index: any): void {
  //   const newItem = { vehicleName: '', vehicleTypeName: '', price: '',remarks:'', vehicleId: ''};
    
  //   this.rowData.splice(index + 1, 0, newItem);
  //   if(this.gridApi){
  //     this.gridApi.applyTransaction({
  //       add: [newItem],
  //       addIndex: index + 1 
  //   })
  // }
  
  //   console.log(this.gridApi)
  // }
  // addNewItem(): void {
  //   const newItem = { vehicleName: '', vehicleTypeName:'', price: '',remarks:'', vehicleId: ''};
    
  //   if(this.gridApi){
  //     this.gridApi.applyTransaction({
  //       add: [newItem]
  //   })
  // }
  
  //   console.log(this.gridApi)
  // }
  

}
