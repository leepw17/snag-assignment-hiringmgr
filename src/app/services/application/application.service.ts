import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(
    private http: Http
  ) { }

  addApplication(application){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('api/application/add', application, { headers: headers })
      .pipe(map(res => res.json()));
  }

  getItemById(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('api/application/' + id, { headers: headers })
      .pipe(map(res => res.json()));
  }

  getAccepted(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('api/application/getAccepted', { headers: headers })
      .pipe(map(res => res.json()));
  }

  getRejected(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('api/application/getRejected', { headers: headers })
      .pipe(map(res => res.json()));
  }


}
