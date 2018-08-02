import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(
    private http: Http
  ) { }

  getActiveQuestions(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('api/question/getActiveQuestions', { headers: headers })
      .pipe(map(res => res.json()));
  }

  getItemById(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('api/question/' + id, { headers: headers })
      .pipe(map(res => res.json()));
  }

  addQuestion(question){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('api/question/add', question, { headers: headers })
      .pipe(map(res => res.json()));
  }

  updateQuestion(updatedQuestion){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('api/question/update', updatedQuestion, { headers: headers })
      .pipe(map(res => res.json()));
  }
}
