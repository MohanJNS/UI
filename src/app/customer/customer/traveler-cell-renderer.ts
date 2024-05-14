import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { DataService } from '../../data.service';



@Component({
  selector: 'app-traveler-cell-renderer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<div class="container p-3">
<div class="container p-3">
  <div *ngIf="!editing">
    <div class="row mb-3">
      <div class="col">
        <b>First Name</b> {{ params?.data?.firstName }}
      </div>
      <div class="col">
        <b>Last Name</b> {{ params?.data?.lastName }}
      </div>
      <div class="col">
        <b>Traveler Age</b> {{ params?.data?.travelerAge }}
      </div>
      <div class="col">
        <b>Contact Number</b> {{ params?.data?.contactNumber }}
      </div>

      <div class="row">
        <div class="col">
          <b>Profession</b>
          <div>{{ params?.data?.profession }}</div>
        </div>
        <div class="col-md-7 mt-1">
          <div class="container">
            <div class="row align-items-center">
              <div class="col"></div>
              <div class="col-auto">
                <button type="button" class="btn btn-outline-primary btn-sm" style="margin-right: 10px;"  (click)="startEditing()">
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
  </div>

  <!-- Edit mode -->
  <div *ngIf="editing " class="container">
    <div class="row">
      <div class="col-3">
        <label for="firstname">First Name</label>
        <input type="text" class="form-control mb-2" [(ngModel)]="params.data.firstName" />
      </div>
      <div class="col-3">
        <label for="lastname">Last Name</label>
        <input type="text" class="form-control mb-2" [(ngModel)]="params.data.lastName" />
      </div>
      <div class="col-3">
            <label for="gender">Gender</label>
            <select class="form-select" [(ngModel)]="params.data.genderId">
                <option selected disabled value="">Select Gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Other</option>
            </select>
        </div>
      <div class="col-2">
        <label for="age">Age</label>
        <input type="text" class="form-control mb-2" [(ngModel)]="params.data.travelerAge" />
      </div>
      <div class="col-3">
        <label for="number">Contact Number</label>
        <input type="text" class="form-control mb-2" [(ngModel)]="params.data.contactNumber" />
      </div>
      <div class="col-3">
            <label for="meal">MealType</label>
            <select class="form-select" [(ngModel)]="params.data.mealPreference">
                <option selected disabled value="">Select MealType</option>
                <option value="1">Veg</option>
                <option value="2">Non-Veg</option>
                <option value="3">Other</option>
            </select>
        </div>
      <div class="col-3">
        <label for="profession">Profession</label>
        <input type="text" class="form-control mb-2" [(ngModel)]="params.data.profession" />
      </div>
    </div>
    
    <div class="container mt-3" >
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
        .delete-icon {
        text-align: right; 
        height: 10px;
        line-height: 10px; 
        margin-top:-10px;
        margin-right:-18px;
      }
   `]
})
export class TravelerCellRendererComponent implements ICellRendererAngularComp, OnInit {

  constructor(private dataservice: DataService) { }


  addingNewItem: boolean = false;
  editingExistingItem: boolean = false;


  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }


  public params: any;
  public editing: boolean = false;

  private originalData: any;
  public search: any;

  agInit(params: any): void {
    console.log('EventCellRendererComponent agInit called with params:', params);
    this.params = params;
    console.log(this.params)
    this.editing = this.params.data.travelerId == '' ? true : false;
    this.originalData = JSON.parse(JSON.stringify(this.params.data));

  }


  ngOnInit(): void {

  }

  startEditing(): void {
    this.editing = true;
    this.editingExistingItem = true;
    this.addingNewItem = false;
  }



  onCancel(): void {
    Object.assign(this.params.data, this.originalData);
    this.params.api.refreshCells({ rowNodes: [this.params.node], force: true });
    this.editing = false;
  }



  onSaveClick(event: any): void {
    if (this.params.onSaveClick) {
      this.params.onSaveClick(this.params.node.data);
    }
    this.editing = false;
  }

  addItem(): void {
    this.params.onAddItem(this.params.node.rowIndex);
  }

  removeItem(): void {
    console.log("removeitem cliked")
    if (this.params.onRemoveItem) {
      this.params.onRemoveItem(this.params.data);
    }
  }

  refreshCell(rowIndex: number): void {
    if (this.params.api) {
      this.params.api.refreshCells({
        rowNodes: [this.params.api.getRowNode(rowIndex)],
        force: true,
      });
    }
  }
}