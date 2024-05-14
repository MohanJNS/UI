import { CommonModule, DatePipe } from '@angular/common';
import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { BsDatepickerConfig, BsDatepickerDirective, BsDatepickerModule, BsDaterangepickerDirective, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DataService } from '../../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { RateCardRendererComponent } from '../ratecard-renderer.component';
import { GridButtonComponent } from '../../action-event/gridbutton-renderer.component';
import { Console } from 'console';
@Component({
  selector: 'app-hotel-rate-card',
  standalone: true,
  imports: [AgGridModule, ReactiveFormsModule, CommonModule, BsDatepickerModule, RateCardRendererComponent],
  providers: [DataService, DatePipe],
  templateUrl: './hotel-rate-card.component.html',
  styleUrl: './hotel-rate-card.component.scss'
})
export class HotelRateCardComponent implements OnChanges, OnInit {

  @Input() season: any;


  rateCarddata: any[] = [];
  rateCardForm: FormGroup | any;
  dateRanges: any[] = [];
  currentAccommId!: number;

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  selecteddata: any;
  rowData: any[] = [];

  public frameworkComponents: any;
  public gridOptions!: GridOptions;
  public columnDefs: ColDef[] = [];
  public gridApi!: GridApi;
  Data!: any;
  seasonId: any;
  isFormDisabled: boolean = true;
  constructor(private fb: FormBuilder, private dataservice: DataService, private router: Router, private route: ActivatedRoute
    , private datePipe: DatePipe
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    {
      this.initializeForm();
      this.gridOptions = {
        suppressClickEdit: true,
        suppressDragLeaveHidesColumns: false,
        suppressMovableColumns: true,
      };
    }
  }


  initializeForm(): void {
    this.rateCardForm = this.fb.group({
      seasonId: [''],
      seasonName: [''],
      selecteddate: [''],
      accommId: [''],
      // dateRanges: this.fb.array([])
    });
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['season'] && changes['season'].currentValue) {
      this.Data = changes['season'].currentValue;

      this.rowData = this.Data.ratecard
      if (this.Data.season_id) {
        this.seasonId = this.Data.season_id;
      }
      this.updateDateRanges();
    }
  }


  updateDateRanges(): void {
    if (this.Data && this.Data.daterange) {
      this.dateRanges = this.Data.daterange.map((range: any) => ({
        rate_from_date: this.formatDate(range.rate_from),
        rate_to_date: this.formatDate(range.rate_to),
        daterangeId: range.daterange_id,
        deleted: range.deleted,
      }));
      console.log("Updated Date Ranges:", this.dateRanges);
    }
  }

  formatDate(date: string): any {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {


    this.initializeGrid();
    if (this.route.snapshot.params['selecteddata']) {
      this.selecteddata = JSON.parse(this.route.snapshot.params['selecteddata']);
    }
    console.log(this.selecteddata)
    this.rateCardForm.patchValue(
      {
        seasonName: this.Data.season_name,
        seasonId: this.Data.season_id
      });

    this.adjustWindowScrollingBasedOnRowData();

  }



  public defaultColDef = {
    flex: 1,
    minWidth: 50,
    editable: false,
    resizable: true,
  };

  initializeGrid() {
    this.columnDefs = [
      {
        cellRenderer: RateCardRendererComponent,
        field: 'RateCard Details',
        autoHeight: true,
        sortable: false,
        cellRendererParams: {
          onSaveClick: this.saveRateCard.bind(this),
          onAddItem: (index: number) => this.addNewItemBelow(index),
          onRemoveItem: (data: any) => this.removeItem(data),
          //  onSaveDeleted:()=>this.onSaveButtonClicked.bind(this)
        }
      }
    ];

  }


  onGridReady(params: GridReadyEvent) {
    console.log('called')
    this.gridApi = params.api;
  }


  onAddDateRange(): void {
    const selectedDates = this.rateCardForm.value.selecteddate;
    console.log(selectedDates)
    if (selectedDates) {
      const startDate = new Date(selectedDates[0]).toISOString().split('T')[0];
      const endDate = new Date(selectedDates[1]).toISOString().split('T')[0];
      const daterangeId = null;
      this.dateRanges.push({ rate_from_date: startDate, rate_to_date: endDate, daterangeId: '', deleted: false });
      this.rateCardForm.patchValue({ selecteddate: '' });
    }
  }


  SaveDateRange(): void {
    const formData = {
      hotelSeason: {
        accommId: this.Data.accomm_id,
        seasonName: this.rateCardForm.value.seasonName,
        seasonId: this.Data.season_id
      },
      hotelSeasonDateRange: this.dateRanges.map(dr => ({
        rate_from_date: dr.rate_from_date,
        rate_to_date: dr.rate_to_date,
        daterangeId: dr.daterangeId,
        deleted: dr.deleted,
      })),

    };
    console.log(formData);
    this.dataservice.saveDateRange(formData).subscribe({
      next: (response) => {
        if (response && response.seasonId) {
          this.seasonId = response.seasonId;
          this.Data.season_id = this.seasonId
          console.log('Season saved/updated with ID:', this.seasonId);
          alert("saved successfully")
        }
      },
      error: (error) => console.error('Error:', error)
    });
  }

  addNewItemBelow(index: any): void {
    console.log(this.rowData);
    console.log("Current rowData:", this.rowData);
    console.log("Form values:", this.rateCardForm.value);
    if (!this.rowData) {
      this.rowData = [];
    }

    const newItem = {
      room_type: '',
      meal_type: '',
      tariff: '',
      child_policy: '',
      ratecard_id: '',
      season_id: this.seasonId || ''

    };
    this.rowData?.splice(index + 1, 0, newItem);
    if (this.gridApi) {
      this.gridApi.applyTransaction({
        add: [newItem],
        addIndex: index + 1
      });
    }
  }

  saveRateCard(params: any): void {
    console.log("Data received in onSaveButtonClicked:", params);
    const allRowData: any[] = [];
    const api = this.gridApi;
    api.forEachNodeAfterFilterAndSort((node: any, index: any) => {

      console.log(node.data)
      const mappedData = {
        tariff: node.data.tariff,
        mealType: node.data.meal_type,
        roomType: node.data.room_type,
        seasonId: node.data.season_id,
        ratecardId: node.data.ratecard_id,
        childPolicy: node.data.child_policy,
        displayOrder: index + 1,
        accommId: this.Data.accomm_id,
        seasonName: this.Data.season_name,
        deleted: node.data.deleted
      };
      allRowData.push(mappedData);
    });
    const payload = allRowData;
    console.log(payload);
    this.dataservice.saveRateCard(payload).subscribe({
      next: (data) => {
        console.log('Rate added/updated', data);
        alert("saved successfully")
        // this.gridApi.setColumnsVisible(['Drag'], true);
      },
      error: (error) => console.error('Error:', error)
    });
  }




  removeDateRange(index: number): void {
    console.log(index)
    console.log(this.dateRanges)
    this.dateRanges[index].deleted = true

  }


  adjustWindowScrollingBasedOnRowData() {
    if (this.Data.accomm_id !== null) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustWindowScrollingBasedOnRowData();
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


  toggleFormDisabled() {
    this.isFormDisabled = !this.isFormDisabled;
  }

}