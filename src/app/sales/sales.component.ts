import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CustomerComponent } from '../customer/customer/customer.component';




@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink, AngularEditorModule,
    HttpClientModule, CustomerComponent],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  // providers: [
  //   provideHttpClient(withFetch()) as unknown as Provider
  // ]


})
export class SalesComponent {




}
