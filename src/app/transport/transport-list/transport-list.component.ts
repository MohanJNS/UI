import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

import { ColDef, GridApi, GridOptions,GridReadyEvent } from 'ag-grid-community';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonRendererComponent } from '../../action-event/button-renderer.component';
import { DataService } from '../../data.service';


@Component({
  selector: 'app-transport-list',
  standalone: true,
  imports: [AgGridAngular,CommonModule],
  providers:[DataService],
  templateUrl: './transport-list.component.html',
  styleUrl: './transport-list.component.scss'
})
export class TransportListComponent implements OnInit{
  public rowData: any[] = [];
  public gridOptions!: GridOptions;  
  public gridApi!: GridApi;
  frameworkComponents:any;
  public isBrowser: boolean = false;
  public themeClass: string = "ag-theme-quartz";
  selecteddata: any;
  editData: any;
  constructor(@Inject(PLATFORM_ID) private platformId: any,private router:Router,private dataservice:DataService){
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent
    }
    this.gridOptions = {
      rowHeight: 25, 
    };
  }


  public columnDefs: ColDef[] = [
    { 
      headerName: 'Action', 
      field: '',
      cellRenderer: 'buttonRenderer', 
      cellRendererParams: {
        onEditClick: this.onEditButtonClicked.bind(this),
        onDeleteClick: this.onDeleteButtonClicked.bind(this)
      },
      pinned: 'left',
      sortable: false,
      filter: false,
      resizable: true,
      autoHeight: true,
      minWidth: 95,
      width: 0,
      
    },
    { field: 'transportName', sortable: true, filter: true},
    { field: 'locationName', sortable: true, filter: true, width:600},
    
  ];


 ngOnInit(): void {
   this.getAllTransports()
  }
  onSearchTextChanged() {
    this.gridApi.setGridOption(
      "quickFilterText",
      (document.getElementById("search") as HTMLInputElement).value,
    );
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }



  getAllTransports(){
    this.dataservice.getAllTransports().subscribe((data: any)=>{
      this.rowData = data.transportDetails;
    }
    )
  }


  onEditButtonClicked(e:any){
    console.log('onEditButtonClicked',e);
    this.selecteddata = e.rowData;
    this.getTransportDetails(this.selecteddata.transportId);
    
  }
  onDeleteButtonClicked(e:any){
    this.selecteddata = e.rowData;
    console.log('onDeleteButtonClicked',e);
    let text = "Are you sure to delete this "+this.selecteddata.transportName+" Transport?";
    if (confirm(text) == true) {
      const payload = {
        transportId : this.selecteddata.transportId,
        deleted: true
      };
      this.dataservice.saveTransport(payload).subscribe({
        next: (response) => {          
          console.log('Transport deleted successfully', response);
          const index = this.rowData.findIndex(item => item.transportId === this.selecteddata.transportId);
          // Remove the selected data from rowData array
          this.rowData.splice(index, 1);
          // Refresh the grid with updated rowData
          this.gridApi.applyTransaction({ remove: [this.selecteddata] });
        },
        error: (error) => {
          console.error('Error deleting Transport', error);
        }
      });
    }

  }

getTransportDetails(transportId: any) {
  this.dataservice.getTransportDetails(transportId).subscribe({
    next: (data: any) => {
      if (data && data.transportDetails) {
        this.editData = data;
        this.openAddLocationModal('Edit'); 
      } else {
        console.error('Data is missing the expected structure');
      }
    },
    error: (error) => {
      console.error('Failed to fetch package details:', error);
    }
  });
}

openAddLocationModal(type:string){
  if(type=='New'){
    this.router.navigate(['/transport-master', { }], { skipLocationChange: true });
  }
  else if(type=='Edit'){  
    this.router.navigate(['/transport-master', {'editData':JSON.stringify(this.editData)}], { skipLocationChange: true });
  }
}
 
}