import { RouteReuseStrategy, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './ui-components/layout/layout.component';

import { SalesComponent } from './sales/sales.component';

import { AccommodationMasterComponent } from './accommodation/accommodation-master/accommodation-master.component';
import { AccommodationListComponent } from './accommodation/accommodation-list/accommodation-list.component';
import { LoginComponent } from './login/login.component';
import { HotelRateCardComponent } from './accommodation/hotel-rate-card/hotel-rate-card.component';
import { TravelerComponent } from './customer/traveler/traveler.component';
import { LeadsListComponent } from './leads/leads-list/leads-list.component';
import { LocationListComponent } from './location/location-list/location-list.component';
import { LocationMasterComponent } from './location/location-master/location-master.component';
import { PackageListComponent } from './package/package-list/package-list.component';
import { PackageMasterComponent } from './package/package-master/package-master.component';

import { TransportListComponent } from './transport/transport-list/transport-list.component';
import { TransportMasterComponent } from './transport/transport-master/transport-master.component';
import { authGuard } from './auth/auth.guard';
import { FooterComponent } from './ui-components/footer/footer.component';
import { HeaderComponent } from './ui-components/header/header.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { LeadsComponent } from './leads/leads/leads.component';
import { CustomizePackageComponent } from './reference/customize-package/customize-package.component';
import { CustomizesaveresultsComponent } from './reference/customizesaveresults/customizesaveresults.component';
import { HistoryNotesComponent } from './reference/history-notes/history-notes.component';
import { PlanTravelComponent } from './reference/plan-travel/plan-travel.component';
import { LeadProfileComponent } from './reference/profile/lead-profile.component';




// export const routes: Routes = [

//     { path:'',component:HomeComponent, pathMatch:'full'},
//     { path:'header',component:HeaderComponent},
//     { path:'sidenav',component:SidenavComponent },
//     { path:'footer',component:FooterComponent },
//     { path:'home',component:HomeComponent, },
//     { path:'dashboard',component:DashboardComponent,},
//     {path:'sales',component:SalesComponent},
//     {path:'package-master',component:PackageMasterComponent},
//     {path:'package-list',component:PackageListComponent},
//     {path:'accommodation-master',component:AccommodationMasterComponent},
//     {path:'accommodation-list',component:AccommodationListComponent},
//     {path:'location-master',component:LocationMasterComponent},
//     {path:'location-list',component:LocationListComponent},
//     {path:'transport-master',component:TransportMasterComponent},
//     {path:'transport-list',component:TransportListComponent}
   
// ];


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
        { path:'header',component:HeaderComponent},
        { path:'footer',component:FooterComponent },
        { path:'home',component:HomeComponent, },
        {path:'leads',component:LeadsComponent},
        {path:'leads-list',component:LeadsListComponent},
        {path:'sales',component:SalesComponent},
        {path:'package-master',component:PackageMasterComponent},
        {path:'package-list',component:PackageListComponent},
        {path:'accommodation-master',component:AccommodationMasterComponent},
        {path:'accommodation-list',component:AccommodationListComponent},
        {path:'customer',component:CustomerComponent},
        {path:'location-master',component:LocationMasterComponent},
        {path:'location-list',component:LocationListComponent},
        {path:'transport-master',component:TransportMasterComponent},
        {path:'transport-list',component:TransportListComponent},
        {path:'hotel-rate-card',component:HotelRateCardComponent},
        {path:'traveler',component:TravelerComponent},


    
       
        {path:'lead-profile',component:LeadProfileComponent},
        {path:'plantravel', component:PlanTravelComponent},
        // {path:'leadfindtravel',component:FindPackageComponent},
        {path:'history-notes', component:HistoryNotesComponent},
        {path:'custom-package',component:CustomizePackageComponent },
        {path:'back-to-plantravel',component:CustomizesaveresultsComponent },






];