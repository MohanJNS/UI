import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SidenavService } from '../sidebar-service/sidenav.service';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  constructor(private sidenavService: SidenavService) { }

  ngOnInit() {

  }


  togglesidebar() {
    this.sidenavService.toggle();
  }

}


