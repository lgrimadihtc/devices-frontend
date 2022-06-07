import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable()
export class SummaryMetricService {
    
    public urlService = environment.UrlApi+"summarymetric";
    constructor(public http:HttpClient) { }

    
    

    getSummaryMetric(): Observable<any> {
        return this.http.get<any>(this.urlService);
    }
}