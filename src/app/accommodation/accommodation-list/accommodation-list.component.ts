import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonRendererComponent } from '../../action-event/button-renderer.component';


@Component({
  selector: 'app-accommodation-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, AgGridModule, ButtonRendererComponent],
  providers: [DataService],
  templateUrl: './accommodation-list.component.html',
  styleUrl: './accommodation-list.component.scss'
})
export class AccommodationListComponent implements OnInit {

  public isBrowser: boolean = false;
  frameworkComponents: any;
  selecteddata: any;


  constructor(@Inject(PLATFORM_ID) private platformId: any, private dataservice: DataService, private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent
    }
    this.gridOptions = {
      rowHeight: 25,
    };
  }
  ngOnInit(): void {
    this.getAccommodationdata()
  }
  public rowData: any[] = [];
  public location: any[] = [];
  public filteredRowData: any[] = [];
  public gridOptions!: GridOptions;


  public columnDefs: ColDef[] = [
    {
      headerName: 'Action',
      field: '',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onEditClick: this.onEditButtonClicked.bind(this),
        onDeleteClick: this.onDeleteButtonClicked.bind(this),
      },
      pinned: 'left',
      sortable: false,
      filter: false,
      resizable: true,
      autoHeight: true,
      minWidth: 95,
      width: 0,

    },
    { field: 'accommId', sortable: true, filter: true, width: 150 },
    { field: 'accommName', sortable: true, filter: true },
    { field: 'accommType', sortable: true, filter: true },
    { field: 'locationId', sortable: true, filter: true },
    { field: 'locationName', sortable: true, filter: true },

  ];


  public themeClass: string = "ag-theme-quartz";

  // changeSize(value: string) {
  //   const sizes = ['large', 'normal', 'compact'];
  //   const el = document.querySelector<HTMLElement>(
  //     '[class*="ag-theme-quartz"]'
  //   )!;
  //   sizes.forEach((size) => el.classList.toggle(size, size === value));
  // }

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };


  onEditButtonClicked(e: any) {
    console.log('onEditButtonClicked', e);
    this.selecteddata = e.rowData;
    this.openAddHotelModal('Edit')
    // const modalRef = this.modal.open(AccommodationMasterComponent, {
    //   windowClass: '',
    //   size: 'xl',
    //   centered: true,
    //   scrollable: true,
    //   backdrop: 'static'

    // });

  }

  onDeleteButtonClicked(e: any) {
    console.log('onDeleteButtonClicked', e);
    let text = "Are you sure to delete the record ?";
    if (confirm(text) == true) {
      this.deleteAccommdetails(e.rowData.accommId);
    }

  }
  getAccommodationdata(): void {
    this.dataservice.getAccommodation().subscribe((data: any) => {
      this.rowData = data.accomDetails;
    });
  }


  deleteAccommdetails(accommId: number) {
    this.dataservice.deleteAccommodation(accommId).subscribe({
      next: (response) => {
        console.log('Accommodation deleted successfully', response);
      },
      error: (error) => {
        console.error('Error deleting accommodation', error);
      }
    });
  }

  openAddHotelModal(type: string) {
    if (type == 'New') {
      this.router.navigate(['/accommodation-master', {}], { skipLocationChange: true });
    }
    else if (type == 'Edit') {
      this.router.navigate(['/accommodation-master', { 'selecteddata': JSON.stringify(this.selecteddata) }], { skipLocationChange: true });
    }
  }

  onGridReady(params: GridReadyEvent) {
    params.api.redrawRows();
  }

}
