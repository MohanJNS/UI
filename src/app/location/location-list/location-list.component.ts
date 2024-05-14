import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridOptions } from 'ag-grid-community';

import { AgGridModule } from 'ag-grid-angular';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonRendererComponent } from '../../action-event/button-renderer.component';
import { DataService } from '../../data.service';


@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [AgGridModule, CommonModule],
  providers: [DataService],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.scss'
})
export class LocationListComponent implements OnInit {
  public rowData: any[] = [];
  public gridOptions!: GridOptions;
  frameworkComponents: any;
  public isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private router: Router, private dataservice: DataService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent
    }
    this.gridOptions = {
      rowHeight: 25,
    };
  }



  ngOnInit(): void {
    this.gethotellocation();
  }



  gethotellocation() {
    this.dataservice.getLocations().subscribe((data: any) => {
      this.rowData = data.locationDetails;
    }
    )
    console.log(this.rowData);
  }

  public columnDefs: ColDef[] = [
    {
      headerName: 'Action',
      field: '',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onEditClick: this.onEditButtonClicked.bind(this),
      },
      pinned: 'left',
      sortable: false,
      filter: false,
      resizable: true,
      autoHeight: true,
      minWidth: 95,
      width: 0,

    },
    { field: 'locationId', sortable: true, filter: true },
    { field: 'locationName', sortable: true, filter: true },
    { field: 'stateCode', sortable: true, filter: true },
    { field: 'stateName', sortable: true, filter: true },

  ];
  selecteddata: any;
  public themeClass: string = "ag-theme-quartz";

  onEditButtonClicked(e: any) {
    console.log('onEditButtonClicked', e);
    this.selecteddata = e.rowData;
    this.openAddLocationModal('Edit')
  }


  openAddLocationModal(type: string) {
    if (type == 'New') {
      this.router.navigate(['/location-master', {}], { skipLocationChange: true });
    }
    else if (type == 'Edit') {
      this.router.navigate(['/location-master', { 'selecteddata': JSON.stringify(this.selecteddata) }], { skipLocationChange: true });
    }
  }



}
