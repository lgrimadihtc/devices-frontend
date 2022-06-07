import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User,Device } from '../pages/devices/devices.model';
import { environment } from '../../environments/environment';
@Injectable()
export class DailyStatusSumaryService {

    public urlService = environment.UrlApi+"dailystatussumary";
    constructor(public http:HttpClient) { }

    
    ////

    getDailyStatusSumary(): Observable<any> {
        return this.http.get<any>(this.urlService);
    }

 
} 