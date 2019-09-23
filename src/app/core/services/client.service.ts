import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient } from 'src/app/shared/interfaces/iclient';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  urlEndpoint ='https://testbankapi.firebaseio.com/clients.json';

  constructor(private http: HttpClient) {

   }

  getUser(): Observable<any> {
    return this.http.get(this.urlEndpoint);
  }

  postUser(body): Observable<any> {
    return this.http.post(this.urlEndpoint, body);
  }
}
