import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { DataService } from '../data.service';

@Component({
    selector: 'app-event-cell-renderer',
    standalone: true,
    imports: [CommonModule,FormsModule],
    template: `

   <div class="container p-3">
        <div *ngIf="!editing">
            <div class="row mb-3">
            <div class="col">
                <b>Days:</b> {{ params?.data?.eventDay }}
            </div>
            <div class="col">
                <b>Location:</b> {{ params?.data?.locationName }}
            </div>
            <!-- <div class="col">
                <b>Display order:</b> {{ params?.data?.displayOrder }}
            </div> -->
            <div class="row">
            <div class="col">
                <b>Event Description:</b>
                <div>{{ params?.data?.eventDescription }}</div>
          
            </div>
            <div class="col-md-7">
            <!-- Buttons -->
            <div class="container">
                <div class="row align-items-center">
                    <div class="col"></div>
                    <div class="col-auto">
                        <button type="button" class="btn btn-outline-primary btn-sm"  style="margin-right: 10px;" *ngIf="!editing" (click)="startEditing()">
                            <span class="material-symbols-outlined">edit</span>
                        </button>
                        <button type="button" class="btn btn-outline-primary btn-sm" style="margin-right: 10px;" (click)="addItem()">
                            <span class="material-symbols-outlined">add</span>
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm" (click)="removeItem()">
                            <span class="material-symbols-outlined">remove</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
   <!-- <div class="container mt-3">
      <div class="row align-items-center">
         <div class="col"></div>
         <div class="col-auto">
        </div>
        <div class="col"></div>
        <div class="col-auto">
        <button type="button" class="btn btn-outline-primary btn-sm" style="margin-right: 10px;" *ngIf="!editing" (click)="startEditing()">
                <span class="material-symbols-outlined">edit</span>
            </button>
            <button type="button" class="btn btn-outline-primary btn-sm" style="margin-right: 10px;" (click)="addItem()">
                <span class="material-symbols-outlined">add</span>
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm" (click)="removeItem()">
                <span class="material-symbols-outlined">remove</span>
            </button>
        </div>
    </div>


        </div> -->

  
    </div>

  <div *ngIf="editing" class="container p-3">
    <div class="row">
      <div class="col">
      <label for="eventDay">Days</label>
        <input type="text" class="form-control mb-2"
               [(ngModel)]="params.data.eventDay"
               />
      </div>
      <!-- <div class="col">
      <label for="locationName">Location</label>
         <input type="text" class="form-control mb-2" [(ngModel)]="params.data.locationName"/>
      </div> -->
      <div class="col">
      <label for="eventDay">location Name</label>   
      <select [(ngModel)]="params.data.locationId" (ngModelChange)="onLocationChange($event)" class="form-select">
        <option *ngFor="let location of locations" [ngValue]="location.locationId">{{ location.locationName }}</option>
      </select>
      </div>
     <div class="row">
      <div class="col">
      <label for="eventDescription">Event Description</label>
      <textarea class="form-control"rows="4" [(ngModel)]="params.data.eventDescription"></textarea>
      </div>
    </div>

    </div>
    <div class="container mt-3">
      <div class="row align-items-center">
       <div class="col"></div>
       <div class="col-auto">
       <button class="btn btn-success" (click)="onSaveClick($event)" style="margin-right: 10px;">Save</button>
       <button *ngIf="editingExistingItem"class="btn btn-warning" (click)="onCancel()" style="margin-right: 10px;">Cancel</button>    </div>
        <div class="col"></div>
        <div class="col-auto">
            <button type="button" class="btn btn-outline-primary btn-sm" style="margin-right: 10px;" (click)="addItem()">
                <span class="material-symbols-outlined">add</span>
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm" (click)="removeItem()">
                <span class="material-symbols-outlined">remove</span>
            </button>
        </div>
    </div>
</div>
</div>


</div>


  `,
    styles: [`
    
    `]
})
export class EventCellRendererComponent implements ICellRendererAngularComp,OnInit {
 
constructor(private dataservice:DataService){}


addingNewItem: boolean = false;
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
        console.log(this.params)

        this.editing = this.params.data.itineraryId==''? true:false
        // this.editing = false;
       
        console.log(this.editing)
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
        this.addingNewItem = false;
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
            this.params.api.forEachNode((node: { data: any; }) => 
            {allRowData.push(node.data)
             
            });
            console.log(allRowData)
            if (this.params.onSaveClick instanceof Function) {
                this.params.onSaveClick({
                    event: $event,
                    updatedData: this.params.node.data,
                    allData: allRowData,
                    
                });

                // if (this.params.data.isNew) {
                //     this.params.data.isNew = false; 
                //     this.params.api.refreshCells({ force: true });
                //   }

            }
        
            this.editing = false;
        }
        

        addItem(): void {
        
            // if (this.params.onAddItem) {
              this.params.onAddItem(this.params.node.rowIndex);
            // }
          }
        
          removeItem(): void {
            if (this.params.onRemoveItem) {
              this.params.onRemoveItem(this.params.data);
            }
          }
   
      }
  


      

