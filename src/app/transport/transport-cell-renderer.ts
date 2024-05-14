import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
// import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-transport-cell-renderer',
  standalone: true,
  imports: [CommonModule,FormsModule],
  template: `<div class="container p-3">
  @if(editing){
  <div class="delete-icon" style="cursor:pointer; color: red;">
    <span class="material-symbols-outlined" (click)="removeItem()">
      cancel
    </span>
  </div>
  <div class="row mb-3">
  <div class="col-1">
        <!-- Edit Button -->
        <button type="button" class="btn btn-outline-primary btn-sm" (click)="startEditing()">
            <span class="material-symbols-outlined">edit</span>
        </button>
    </div>
    <div class="col-3">
        <b>Name:</b> {{ params?.data?.vehicleName }}
    </div>
    <div class="col-2">
        <b>Type:</b> {{ params?.data?.vehicleType }}
    </div>
    <div class="col-2">
        <b>Price:</b> {{ params?.data?.price }}
    </div>
    <div class="col-4">
        <b>Remarks: </b>{{ params?.data?.remarks }}
    </div>

</div>
} @else if (!editing) { 
  <div class="delete-icon" style="cursor:pointer; color: red;">
    <span class="material-symbols-outlined" (click)="removeItem()">
    cancel
    </span>
  </div>
<div class="row">
<div class="col-3">
<label for="eventDay">Name</label>
  <input type="text" class="form-control mb-2"
         [(ngModel)]="params.data.vehicleName"
         />
</div>
<!--  -->
<!--<div class="col">   
<select [(ngModel)]="params.data.vehicleTypeId" (ngModelChange)="onVehicleTypeChange($event)" class="form-select">
  <option *ngFor="let vehicleType of vehicleTypes" [ngValue]="vehicleType.vehicleTypeId">{{ vehicleType.name }}</option>
</select>
</div> -->
<div class="col-2">
<label for="price">Price</label>   
<input type="text" class="form-control mb-2"
         [(ngModel)]="params.data.price"
         />
</div>
<div class="col-4">
<label for="eventDescription">Remarks</label>
<textarea class="form-control"rows="1" [(ngModel)]="params.data.remarks"></textarea>
</div>


</div>

<div class="container mt-3" *ngIf="params.data.vehicleId !== null && params.data.transportId !== null && params.data.transportId !== ''">
    <div class="row align-items-center">
        <div class="col"></div>
        <div class="col-auto">
            <button class="btn btn-success"  (click)="onSaveClick($event)" style="margin-right: 10px;">Save</button>
            <button class="btn btn-warning"  (click)="onCancel()" style="margin-right: 10px;">Cancel</button>
        </div>
    </div>
</div>


}
 `,
   styles: [`
        .delete-icon {
        text-align: right; /* Align the content to the right */
        height: 10px; /* Set the height to 10px */
        line-height: 10px; /* Set the line height to vertically center the content */
        margin-top:-10px;
        margin-right:-18px;
      }
   `]
})
  export class TransportCellRendererComponent implements ICellRendererAngularComp,OnInit {
 
  constructor(private dataservice:DataService){}


addingNewItem: boolean = false;
editingExistingItem: boolean = false;


    refresh(params: ICellRendererParams): boolean {
        this.params = params;
        return true;
      }
      

    public params: any;
    public editing: boolean = false;
    public vehicleTypes: { vehicleType: string }[] = []

    private originalData: any;
    public search:any;

    agInit(params: any): void {
        console.log('EventCellRendererComponent agInit called with params:', params);
        this.params = params;
        console.log(this.params)
        this.editing = this.params.data.vehicleId==''? false:true;
        //this.editing = false;
          this.originalData = JSON.parse(JSON.stringify(this.params.data));


        
      }
      

      ngOnInit(): void {
  
          /*this.dataservice.getLocations().subscribe(location => {
            this.locations = location.locationDetails;
        })*/
  
        this.vehicleTypes = [{vehicleType:'Corporte'},
                          { vehicleType:'Premium'},
                          { vehicleType:'Medium'},
                          { vehicleType:'Budgeted'} ]
        this.search = (text$: Observable<string>) =>
          text$.pipe(
            map(term => term === '' ? []
            : this.vehicleTypes
                .filter(item => item.vehicleType.toLowerCase().indexOf(term.toLowerCase()) > -1)
                .map(item => item.vehicleType) 
                .slice(0, 10))
        );
      }
      
      startEditing(): void {
        this.editing = false;
        this.editingExistingItem = true;
        this.addingNewItem = false;
       }

       onVehicleTypeChange(selectedTypeName: string): void {
        const selectedVehicleType = this.vehicleTypes.find(type => type.vehicleType === selectedTypeName);
        if (selectedVehicleType) {
          this.params.data.vechicleTypeName = selectedVehicleType.vehicleType;
          this.params.api.refreshCells({ force: true });
        }
      }

      onCancel(): void {
        Object.assign(this.params.data, this.originalData);
        this.params.api.refreshCells({ rowNodes: [this.params.node], force: true });
        this.editing = true;
      } 
            



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
        
            this.editing = true;
        }
        

        addItem(): void {
        
            // if (this.params.onAddItem) {
              this.params.onAddItem(this.params.node.rowIndex);
            // }
          }
        
        removeItem(): void {
            console.log("removeitem cliked")
            if (this.params.onRemoveItem) {
              console.log(this.params.data);
              //this.params.onRemoveItem(this.params.data);
              let selectedRow = this.params.data
              let text = "Are you sure to delete this "+selectedRow.vechicleName+" vehicle?";
              if (confirm(text) == true) {
                const payload = {
                  vehicleId : selectedRow.vehicleId,
                  deleted: true
                };
              this.dataservice.saveVehicleDetails(payload).subscribe({
              next: (response) => {          
                console.log('Vehicle deleted successfully', response);
                this.params.onRemoveItem(this.params.data);
              },
              error: (error) => {
                console.error('Error deleting Transport', error);
              }
            });
          }
          }
        }
               
        refreshCell(rowIndex: number): void {
          // Check if grid API is available
          if (this.params.api) {
            // Force refresh the cell of the specified row index
            this.params.api.refreshCells({
              rowNodes: [this.params.api.getRowNode(rowIndex)],
              force: true,
            });
          }
      }
    }