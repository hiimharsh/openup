import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ConfessionService {
  constructor(private _http: Http) {

  }

  getConfessions() {
    return this._http.get('/admin/api/json/confessions')
      .map(res => res.json());
  }

  saveConfession(newCon) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('/admin/api/json/confessions/new', JSON.stringify(newCon), {headers: headers})
      .map(res => res.json());
  }

  deleteCon(id) {
    return this._http.delete('/admin/api/json/confessions/' + id)
      .map(res => res.json());;
  }
}