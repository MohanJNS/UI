import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';

import { ColDef, GridOptions } from 'ag-grid-community';
import { ButtonRendererComponent } from '../../action-event/button-renderer.component';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [AgGridModule, CommonModule, RouterModule],
  providers: [DataService],
  templateUrl: './package-list.component.html',
  styleUrl: './package-list.component.scss'
})
export class PackageListComponent implements OnInit {


  public rowData: any[] = [];
  public gridOptions!: GridOptions;
  frameworkComponents: any;
  public isBrowser: boolean = false;
  packageId: any;
  editData: any;

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
    this.getpackages();

  }



  getpackages() {
    this.dataservice.getpackages().subscribe((data: any) => {
      this.rowData = data.packageDetails;

    }
    )

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
    { field: 'packageId', sortable: true, filter: true, width: 140 },
    { field: 'packageName', sortable: true, filter: true },
    { field: 'packageType', sortable: true, filter: true },
    { field: 'packageDuration', sortable: true, filter: true },
    { field: 'packageCategory', sortable: true, filter: true },
    { field: 'pricePremium', sortable: true, filter: true },
    { field: 'priceRegular', sortable: true, filter: true },

  ];
  selecteddata: any;
  public themeClass: string = "ag-theme-quartz";



  openAddLocationModal(type: string) {
    if (type == 'New') {
      this.router.navigate(['/package-master', {}], { skipLocationChange: true });
    }
    else if (type == 'Edit') {
      this.router.navigate(['/package-master', { 'editData': JSON.stringify(this.editData) }], { skipLocationChange: true });
    }
  }

  onEditButtonClicked(e: any) {
    console.log('onEditButtonClicked', e);
    this.selecteddata = e.rowData;
    this.getpackagemaster(this.selecteddata.packageId);
  }

  getpackagemaster(packageId: any) {
    this.dataservice.getPackage(packageId).subscribe({
      next: (data: any) => {
        if (data && data.packageDetails && data.itinerary) {
          this.editData = data;
          console.log("Package Details:", data.packageDetails);
          console.log("Itinerary:", data.itinerary);
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


}
