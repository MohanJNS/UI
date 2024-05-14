import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-gridbutton',
  template: `
 
 

    <span style="cursor:pointer;">
      <i class="material-symbols-outlined" (click)="onSaveClick($event)">save</i>
    </span>
    <!-- <span style="cursor:pointer;">
      <i class="material-symbols-outlined" (click)="onEditClick($event)">edit_square</i>
    </span> -->
    <!-- <span class="material-symbols-outlined">
    edit_square
</span> -->


  `,
  standalone: true,
})
export class GridButtonComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return false;
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
