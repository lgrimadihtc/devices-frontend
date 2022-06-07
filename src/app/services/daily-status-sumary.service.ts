import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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