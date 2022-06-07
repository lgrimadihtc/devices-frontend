import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User,Device } from '../pages/devices/devices.model';
import { environment } from '../../environments/environment';
@Injectable()
export class StatisticService {

    public urlService = environment.UrlApi+"statistic";
    constructor(public http:HttpClient) { }

    
    ////

    getStatistic(): Observable<any> {
        return this.http.get<any>(this.urlService);
    }

 
} 