import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';


import { NavigationEnd, Router, Event as RouterEvent, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Subscription, filter } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SidenavService } from '../sidebar-service/sidenav.service';
import { SidebarComponent } from '../sidebar/sidebar.component';




@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FormsModule, CommonModule, SidebarComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {


  isExpanded = true;
  private sidenavSubscription!: Subscription;
  showLayout: boolean = true;
  constructor(private sidenav: SidenavService, private router: Router) {
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showLayout = !event.urlAfterRedirects.startsWith('/login');
    });
  }

  public getScreenWidth: any;
  public getScreenHeight: any;

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }



  ngOnInit(): void {
    this.sidenavSubscription = this.sidenav.sidenavToggleAction$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    // this.getScreenWidth = window.innerWidth;
    // this.getScreenHeight = window.innerHeight;
  }


  // @HostListener('window:resize', ['$event'])
  // onWindowResize() {
  //   this.getScreenWidth = window.innerWidth;
  //   this.getScreenHeight = window.innerHeight;
  // }
}