import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
  
})
export class DataService {


   url = 'http://localhost:3000';
  // private uurl = 'http://localhost:8080/';

  // private baseUrl = 'http://localhost:8080/master/';
  
  private baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  //   getlocations(): Observable<any> {
  //   return this.http.get(this.url + "/locations");
  // }

  // getpackages(): Observable<any>{
  //   return this.http.get(this.url+"/packages")
  // }

  getpackages():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}getpackagemaster`)
  }

  // getPackageDetails():Observable<any>{
  //   return this.http.get(this.url+"/packageDetails")
  // }
  // getPackageDetails(PackageID: number): Observable<any> {
  //   return this.http.get(this.url + "/packageDetails?PackageID=" + PackageID);
  // }


  // addHotel(hotel_details: any): Observable<any> {
  //   let params = new HttpParams();
  //   params = params.append('hotel_details', hotel_details);
  //   return this.http.post(this.url+"/accommodations", hotel_details);
  // }

  // addHotel(hotel_details: any): Observable<any> {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   console.log("Sending hotel details as:", hotel_details);
  //   return this.http.post(this.url + "/accommodations", hotel_details, { headers: headers });
  // }
  // gethotels(): Observable<any>{
  //   return this.http.get(this.url+"/accommodations")
  // }

  saveOrUpdateAccommodation(payload:any): Observable<any>{
    return this.http.post(`${this.baseUrl}saveOrUpdateAccommodation`,payload)

  }
  getAccommodation(): Observable<any>{
    return this.http.get(`${this.baseUrl}getaccmaster`)
  }
  saveLocation(locationData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}locations`, locationData);
  }

   getLocations(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getlocations`);
  }

  saveTransport(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}saveOrUpdateTransport`, payload);
  }

  getTransport():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}gettransportmaster`)
  }


deleteAccommodation(accommId: number): Observable<any> {
  return this.http.post(`${this.baseUrl}deleteAccommodation/${accommId}`, {});
}

getTags(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}gettags`);
}




// savePackage(payload:any): Observable<any>{
//   return this.http.post(`${this.baseUrl}savePackage`,payload)

// }

// savePackage(packageDetails: any, itineraries: any): Observable<any> {
//   let params = new HttpParams();

//   // Begin assigning parameters
//   params = params.append('packageDetails', packageDetails);
//   params = params.append('itineraries', itineraries);
//   return this.http.post(`${this.baseUrl}savePackage`, params, {
  
//   });
// }
// savePackage(data: { packageDetails: any, itinerary: any }): Observable<any> {
//   return this.http.post(`${this.baseUrl}savePackage`, data, {
//     headers: { 'Content-Type': 'application/json' }
//   });
// }

getPackage(packageId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}getPackageDetails?packageId=${packageId}`);
}

getTransportDetails(transportId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}getTransportDetails/${transportId}`);
}


removeItinerary(IIds: number) {
  return this.http.delete(`${this.baseUrl}deleteItinerary/${IIds}`);
}


saveItinerary(payload: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}saveItinerary`, payload);
}
savePackage(payload: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}savePackage`, payload);
}


deleteItinerary(IIds: number) {
  return this.http.post<any>(`${this.baseUrl}deleteItinerary/${IIds}`,'');
}


getHotelratecard(accommId:number){
  return this.http.get(`${this.baseUrl}gethotelratecard/${accommId}`);
}


saveDateRange(payload: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}saveDateRange`, payload);
}

saveRateCard(payload: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}saveAndUpdateRateCards`, payload);
}


deleteSeason(seasonId: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/season/${seasonId}`);
}

saveCustomer(payload: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}saveCustomer`, payload);
}

getCustomer(customerId:number){
  return this.http.get(`${this.baseUrl}getCustomerDetails/${customerId}`);
}

saveTravellead(payload: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}createOrUpdateLead`, payload);
}
updateTraveler(payload: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}updateTraveler`, payload);
}
saveVehicleDetails(payload: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}updateVehicleDetails`, payload);
}
getAllTransports():Observable<any>{
  return this.http.get<any>(`${this.baseUrl}gettransportmaster`)
}

getPackageData():Observable<any>{
  return this.http.get(`${this.baseUrl}getPackages`)
}

}
