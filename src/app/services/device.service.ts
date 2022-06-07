import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User,Device } from '../pages/devices/devices.model';
import { environment } from '../../environments/environment';
@Injectable()
export class DeviceService {
    public url = "api/users";
    public urlService = environment.UrlApi+"device";
    constructor(public http:HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url);
    }

    addUser(user:User){	    
        return this.http.post(this.url, user);
    }

    updateUser(user:User){
        return this.http.put(this.url, user);
    }

    deleteUser(id: number) {
        return this.http.delete(this.url + "/" + id);
    }


    ////

    getDevices(): Observable<any> {
        return this.http.get<any>(this.urlService);
    }

    

    addDevice(device:Device){	    
        return this.http.post(this.urlService, device);
    }
} 