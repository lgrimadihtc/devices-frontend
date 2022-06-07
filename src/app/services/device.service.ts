import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from '../pages/devices/devices.model';
import { environment } from '../../environments/environment';
@Injectable()
export class DeviceService {
  
    public urlService = environment.UrlApi+"device";
    constructor(public http:HttpClient) { }



    getDevices(): Observable<any> {
        return this.http.get<any>(this.urlService);
    }

    

    addDevice(device:Device){	    
        return this.http.post(this.urlService, device);
    }
} 