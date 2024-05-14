import { Component, HostListener, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SidenavService } from '../sidebar-service/sidenav.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { FooterComponent } from '../footer/footer.component';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, DashboardComponent, CommonModule, FooterComponent,
    RouterLinkActive, HttpClientModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  isExpanded = true;
  private sidenavSubscription!: Subscription;
  public isMobile: boolean = false;


  constructor(private sidenav: SidenavService, private router: Router) { }

  ngOnInit(): void {

    this.sidenavSubscription = this.sidenav.sidenavToggleAction$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
  }



  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    // Clear the authentication state
    localStorage.removeItem('isAuthenticated');

    // Redirect to the login page
    this.router.navigate(['/login']);
  }

  toggleSubMenu(event: any) {
    // event.preventDefault(); 
    const parentLi = event.currentTarget.closest('li');
    const submenu = parentLi.querySelector('.submenu');
    const expandIcon = event.currentTarget.querySelector('.expand-icon');

    if (submenu.style.maxHeight && submenu.style.maxHeight !== "0px") {
      submenu.style.maxHeight = "0px";
      expandIcon.classList.remove('rotate-icon');
    } else {
      submenu.style.maxHeight = submenu.scrollHeight + "px";
      expandIcon.classList.add('rotate-icon');
    }
  }



}
