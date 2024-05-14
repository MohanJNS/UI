import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-renderer',
  template: `
 
    <span style="cursor:pointer; color: red;">
      <i class="material-symbols-outlined" (click)="onDeleteClick($event)">delete</i>
    </span>
    &nbsp;
    <span style="cursor:pointer;">
      <i class="material-symbols-outlined" (click)="onEditClick($event)">edit_square</i>
    </span>

    <!-- <span style="cursor:pointer;">
      <i class="material-symbols-outlined" (click)="onSaveClick($event)">save</i>
    </span> -->
    <!-- <span style="cursor:pointer;">
      <i class="material-symbols-outlined" (click)="onEditClick($event)">edit_square</i>
    </span> -->
    <!-- <span class="material-symbols-outlined">
    edit_square
</span> -->


  `,
  standalone: true,
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return false;
  }

  onEditClick($event: any) {
    if (this.params.onEditClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data
      }
      this.params.onEditClick(params);
    }
  }

  onDeleteClick($event: any) {
    if (this.params.onDeleteClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data
      }
      this.params.onDeleteClick(params);
    }
  }


  onSaveClick($event: any) {
    if (this.params.onSaveClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data
      }
      this.params.onSaveClick(params);
    }
  }
}
