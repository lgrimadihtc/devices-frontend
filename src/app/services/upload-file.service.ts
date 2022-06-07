import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable()
export class UploadFileService {
    constructor(private https: HttpClient) { }
    pushFileToStorage(file: File,id): Observable<HttpEvent<{}>> {
        const data: FormData = new FormData();
        data.append('file', file);
        const newRequest = new HttpRequest('POST', environment.UrlApi+"savefile/"+id, data, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.https.request(newRequest);
    }
}