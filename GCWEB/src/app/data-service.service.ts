import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiLink: string = "http://localhost/gcweb/";
  private serviceUrl = 'https://jsonplaceholder.typicode.com/users';
  
  constructor(private http: HttpClient) { }


  sendRequest(method, data){
    console.log(this.http.post<any>(this.apiLink + method, btoa(JSON.stringify(data))))
    return this.http.post<any>(this.apiLink + method, btoa(JSON.stringify(data)))
  }

  update(num, data){
    return this.http.post(this.apiLink+"update.php?z="+num,
    JSON.stringify(data));
  }
}
