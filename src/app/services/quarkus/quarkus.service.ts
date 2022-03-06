import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { Device } from 'src/app/models/device.model';

@Injectable({
  providedIn: 'root'
})
export class QuarkusService {


  isRegistered:boolean=false;
  baseurl="";
  getEmployeesUrl="api/employee"
  getAnalyticsUrl="api/configuration/analytics"
  registerDeviceUrl="/api/configuration"

  
  registerDevice(data: Device) {
    return this.httpClient.post(this.baseurl+this.registerDeviceUrl,data,{responseType:'json'});
  }
  constructor(private httpClient:HttpClient,private keycloakService:KeycloakService) { }
  register(image:Blob):Observable<any>{
    var form = new FormData();
    form.append("file", image, "file");
    return this.httpClient.post(this.baseurl+"api/employee/photo",form);
  }
  getProfile():Observable<any>{
    return this.httpClient.get(this.baseurl+"api/employee/profile",{responseType:'json'});
  }
  setRegistered(isRegistered:boolean){
    this.isRegistered=isRegistered;
  }
  getRegistered():boolean{
    return this.isRegistered;
  }
  getAttendence():Observable<any>{
    return this.httpClient.get(this.baseurl+"api/employee/attendance",{responseType:'json'});
}
getRegisteredUsers():Observable<any>{
    return this.httpClient.get(this.baseurl+this.getEmployeesUrl,{responseType:'json'});
  }
updateRegisteredUsers(user:any):Observable<any>{
    return this.httpClient.put(this.baseurl+this.getEmployeesUrl,user,{responseType:'json'});
  }
getAnalytics():Observable<any>{
    return this.httpClient.get(this.baseurl+this.getAnalyticsUrl,{responseType:'json'});
  }
}
