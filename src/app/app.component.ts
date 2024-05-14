import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { LayoutComponent } from './ui-components/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LayoutComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
constructor(){
  console.log(environment.production);
}
}
