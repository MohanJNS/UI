import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef, ColGroupDef, DomLayoutType } from 'ag-grid-community';



interface Trip {
  id: number;
  firstname: string;
  lastname: string;
  contact_number: number;
  Home_location: string;
  Home_state: string;
  Address: string;
  travel_category: string;
  Destination: string;
  Planned_date: string;
  Adults: number;
  Children: number;
  Duration: string;
  Budget: number;
  Status: string;
}

@Component({
  selector: 'app-leads-list',
  standalone: true,
  imports: [CommonModule,AgGridAngular,HttpClientModule],
  templateUrl: './leads-list.component.html',
  styleUrl: './leads-list.component.scss'
})
export class LeadsListComponent implements OnInit{

  public isBrowser: boolean = false;
  public domLayout: DomLayoutType = 'autoHeight';
  public headerHeight = 50;
  defaultColDef = {
    sortable: true,
    cellStyle: {'border-right-color': '#e2e2e2'},
    wrapHeaderText: true,
    autoHeight: true
  };
  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }


  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const { AgGridModule } = await import('ag-grid-angular');
      
    }






    
  }
  title = 'trip-details-table';
  
  trips: Trip[] = [
    {
      id: 1,
      firstname: 'Shankar',
      lastname: 'K',
      contact_number: 9830384002,
      Home_location: 'Bangalore',
      Home_state: 'Karnataka',
      Address: 'Jayanagar',
      travel_category: 'FIT',
      Destination: 'Ayodhya',
      Planned_date: '10-Mar-24',
      Adults: 2,
      Children: 0,
      Duration: '3N/4D',
      Budget: 40000,
      Status: 'New'
    },
    {
      id: 2,
      firstname: 'Shashi',
      lastname: 'M',
      contact_number: 9404940901,
      Home_location: 'Hyderabad',
      Home_state: 'Telangana',
      Address: 'Hyderabad',
      travel_category: 'FIT',
      Destination: 'Cochin',
      Planned_date: '01-Mar-24',
      Adults: 2,
      Children: 2,
      Duration: '5N/6D',
      Budget: 50000,
      Status: 'Contacted'
    },
    {
      id: 3,
      firstname: 'Prabhakar',
      lastname: 'L',
      contact_number: 9484948000,
      Home_location: 'Mangalore',
      Home_state: 'Karnataka',
      Address: 'Mangalore',
      travel_category: 'Custom',
      Destination: 'Delhi',
      Planned_date: '23-Mar-24',
      Adults: 1,
      Children: 0,
      Duration: '3N/4D',
      Budget: 20000,
      Status: 'Intersted'
    },
    {
      id: 4,
      firstname: 'Lakshmi',
      lastname: 'J',
      contact_number: 9304940490,
      Home_location: 'Vijayawada',
      Home_state: 'AP',
      Address: 'Vijayawada',
      travel_category: 'Group Trip',
      Destination: 'Shirdi',
      Planned_date: '20-Feb-24',
      Adults: 10,
      Children: 0,
      Duration: '2N/3D',
      Budget: 50000,
      Status: 'Quotation Sent'
    },
    {
      id: 5,
      firstname: 'Pradip',
      lastname: 'A',
      contact_number: 3940494090,
      Home_location: 'Chitoor',
      Home_state: 'AP',
      Address: 'Chitoor',
      travel_category: 'FIT',
      Destination: 'Chardham',
      Planned_date: '01-Mar-24',
      Adults: 4,
      Children: 2,
      Duration: '9N/10D',
      Budget: 100000,
      Status: 'In Negotiation'
    },
    {
      id: 6,
      firstname: 'Karan',
      lastname: '',
      contact_number: 9404409090,
      Home_location: 'Delhi',
      Home_state: 'Delhi',
      Address: 'Delhi',
      travel_category: 'FIT',
      Destination: 'Cochin',
      Planned_date: '10-Mar-24',
      Adults: 2,
      Children: 2,
      Duration: '7N/8D',
      Budget: 60000,
      Status: 'Converted'
    },
    {
      id: 7,
      firstname: 'Shekhar',
      lastname: 'M',
      contact_number: 4940494093,
      Home_location: 'Mumbai',
      Home_state: 'Maharashtra',
      Address: 'Mumbai',
      travel_category: 'FIT',
      Destination: 'Kanyakumari',
      Planned_date: '20-Mar-24',
      Adults: 4,
      Children: 0,
      Duration: '5N/6D',
      Budget: 40000,
      Status: 'Follow-up'
    },
    {
      id: 8,
      firstname: 'Lorence',
      lastname: 'D',
      contact_number: 9545850950,
      Home_location: 'Pune',
      Home_state: 'Maharashtra',
      Address: 'Pune',
      travel_category: 'FIT',
      Destination: 'Kashmir',
      Planned_date: '01-Mar-24',
      Adults: 2,
      Children: 1,
      Duration: '6N/7D',
      Budget: 60000,
      Status: 'Not Interested'
    },
    {
      id: 9,
      firstname: 'Meghna',
      lastname: 'P',
      contact_number: 9494840480,
      Home_location: 'Cochin',
      Home_state: 'Kerala',
      Address: 'Cochin',
      travel_category: 'FIT',
      Destination: 'Bhutan',
      Planned_date: '10-Mar-24',
      Adults: 3,
      Children: 2,
      Duration: '7N/8D',
      Budget: 100000,
      Status: 'Lost'
    },
    {
      id: 10,
      firstname: 'Madhav',
      lastname: 'D',
      contact_number: 4948494800,
      Home_location: 'Bangalore',
      Home_state: 'Karnataka',
      Address: 'Basavanagudi',
      travel_category: 'Custom',
      Destination: 'Meghalaya',
      Planned_date: '15-Mar-24',
      Adults: 2,
      Children: 2,
      Duration: '7N/8D',
      Budget: 100000,
      Status: 'On Hold'
    },
    {
      id: 11,
      firstname: 'Shrinivas',
      lastname: 'P',
      contact_number: 9404940490,
      Home_location: 'Chennai',
      Home_state: 'Tamilnadu',
      Address: 'Chennai',
      travel_category: 'Custom',
      Destination: 'Mumbai',
      Planned_date: '10-Mar-24',
      Adults: 2,
      Children: 2,
      Duration: '5N/6D',
      Budget: 60000,
      Status: 'Re-engaged'
    }
  ]


  columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'id', sortable: true, filter: true, width: 80,wrapText: true},
    { field: 'firstname', sortable: true, filter: true, width: 170,wrapText: true} ,
    { field: 'lastname', sortable: true, filter: true,width: 120,wrapText: true},
    { field: 'Destination', sortable: true, filter:true,width: 170,wrapText: true},
    { field: 'Planned_date', sortable: true,filter:true, width: 160,wrapText: true},
    { field: 'Budget', sortable: true, filter: true, width: 140},
    { field: 'Status', sortable: true, filter: true, width: 140,wrapText: true,flex: 2},
    // { field: 'Action', sortable: true, filter: true, width: 150,wrapText: true,flex: 2},
  ];
  

  rowData: Trip[] = this.trips;

  
  gridOptions = {
    icons: {
      sortAscending: '<i class="fas fa-sort-alpha-up"></i>', // FontAwesome icon
      sortDescending: '<i class="fas fa-sort-alpha-down"></i>',
      // other icons...
    }
  };
  

  
}




