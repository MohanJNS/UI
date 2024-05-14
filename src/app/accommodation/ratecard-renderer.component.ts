import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { DataService } from '../data.service';

@Component({
  selector: 'app-ratecard-renderer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `

   <div class="container p-3" >
   <div *ngIf="!editing">
    <div class="row mb-3">
        <div class="col">
            <b>Room Type:</b> {{ params?.data?.room_type }}
        </div>
        <div class="col">
            <b>Meal Type:</b> {{ params?.data?.meal_type }}
        </div>
        <div class="col">
            <b>Tarrif:</b> {{ params?.data?.tariff }}
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-sm-9">
            <b>Child Policy:</b>
            <div>{{ params?.data?.child_policy }}</div>
        </div>
        <div class="col-sm-3">
            <!-- Buttons -->
            <div class="container mt-3">
                <div class="row align-items-center">
                    <div class="col"></div>
                    <div class="col-auto">
                        <button type="button" class="btn btn-outline-primary btn-sm"  style="margin-right: 10px;" *ngIf="!editing" (click)="startEditing()">
                            <span class="material-symbols-outlined">edit</span>
                        </button>
                        <button type="button" class="btn btn-outline-primary btn-sm" style="margin-right: 10px;" (click)="addItem()">
                            <span class="material-symbols-outlined">add</span>
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm" (click)="onSaveDeleted($event)">
                            <span class="material-symbols-outlined">remove</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


  <div *ngIf="editing" class="container">
    <div class="row">
      <div class="col">
        <label for="RoomType">Room Type</label>
          <input type="text" class="form-control mb-2"[(ngModel)]="params.data.room_type"/>
        </div>
        <div class="col">
          <label for="MealType">Meal Type</label>
           <input type="text" class="form-control mb-2" [(ngModel)]="params.data.meal_type"/>
        </div>
        <div class="col">
          <label for="Tarrif">Tarrif</label>
            <input type="text" class="form-control mb-2" [(ngModel)]="params.data.tariff"/>
        </div>
      
      <div class="row mb-3">
          <div class="col-sm-9">
              <label for="ChildPolicy">Child Policy</label>
              <textarea id="ChildPolicy" class="form-control" rows="2" [(ngModel)]="params.data.child_policy"></textarea>
           </div>
            <div class="col-sm-3">
                <div class="container mt-3">
                    <div class="row align-items-center">
                        <div class="col"></div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-outline-primary btn-sm" style="margin-right: 10px;" (click)="addItem()">
                                <span class="material-symbols-outlined">add</span>
                            </button>
                            <button type="button" class="btn btn-outline-danger btn-sm" (click)="onSaveDeleted($event)">
                                <span class="material-symbols-outlined">remove</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
      </div>

     <div class="container mt-3">
         <div class="row align-items-center">
           <div class="col"></div>
            <div class="col-auto">
            <button class="btn btn-success" (click)="onSaveClick($event)" style="margin-right: 10px;">Save</button>
            <button class="btn btn-warning" (click)="onCancel()" style="margin-right: 10px;">Cancel</button>    </div>
              <div class="col"></div>
              </div>
            </div>
        </div>
    </div>


  `,
  styles: [`
    
    `]
})
export class RateCardRendererComponent implements ICellRendererAngularComp, OnInit {


  constructor(private dataservice: DataService) { }


  editingExistingItem: boolean = false;


  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }


  public params: any;
  public editing: boolean = false;
  public locations: any[] = [];
  private originalData: any;

  agInit(params: any): void {
    console.log('EventCellRendererComponent agInit called with params:', params);
    this.params = params;
    console.log(this.params.data)

    this.editing = this.params.data.ratecard_id == '' ? true : false
    this.originalData = JSON.parse(JSON.stringify(this.params.data));
  }


  ngOnInit(): void {

    this.dataservice.getLocations().subscribe(location => {
      this.locations = location.locationDetails;
    })



  }

  startEditing(): void {
    this.editing = true;
    this.editingExistingItem = true;
  }

  onLocationChange(selectedLocationId: string): void {
    const selectedLocation = this.locations.find(loc => loc.locationId === selectedLocationId);
    if (selectedLocation) {
      this.params.data.locationId = selectedLocation.locationId;
      this.params.data.locationName = selectedLocation.locationName;
      this.params.api.refreshCells({ force: true });
    }
  }

  onCancel(): void {
    Object.assign(this.params.data, this.originalData);
    this.params.api.refreshCells({ rowNodes: [this.params.node], force: true });
    this.editing = false;
  }





  //    onSaveClick($event: any): void {

  //     this.editing = false;

  //     if (this.params.onSaveClick instanceof Function) {
  //         const params = {
  //           event: $event,
  //           rowData: this.params.node.data
  //         }
  //         this.params.onSaveClick({params});
  //       }
  //     }



  onSaveClick($event: any): void {

    const allRowData: any[] = [];
    this.params.api.forEachNode((node: { data: any; }) => {
      allRowData.push(node.data)

    });
    console.log(allRowData)
    if (this.params.onSaveClick instanceof Function) {
      this.params.onSaveClick({
        event: $event,
        updatedData: this.params.node.data,
        allData: allRowData,

      });


    }

    this.editing = false;
  }


  addItem(): void {

    // if (this.params.onAddItem) {
    this.params.onAddItem(this.params.node.rowIndex);
    // }
  }

  // removeItem(): void {
  //   if (this.params.onRemoveItem) {
  //     this.params.data.deleted = true;

  //     this.params.onRemoveItem(this.params.data);
  //   }
  // }


  onSaveDeleted($event: any): void {
    console.log(this.params.data)
    if (this.params.data.ratecard_id !== null && this.params.data.ratecard_id !== '') {
      this.params.data.deleted = true
      const allRowData: any[] = [];
      this.params.api.forEachNode((node: { data: any; }) => {
        allRowData.push(node.data)

      });
      console.log(allRowData)
      if (this.params.onSaveClick instanceof Function) {
        this.params.onSaveClick({
          event: $event,
          updatedData: this.params.node.data,
          allData: allRowData,

        });
      }
    }
    this.params.onRemoveItem(this.params.data);
  }
}

