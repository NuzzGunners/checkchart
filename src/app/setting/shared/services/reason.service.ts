import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw'

import { Reason } from './reason';
import { ConfigService } from '../../../shared/utils/config.service';

@Injectable()
export class ReasonService {

  _baseUrl: string = '';

  constructor(
    private http: Http,
    private configService:ConfigService
  ) {
    this._baseUrl = configService.getApiURICheckchart();
  }

  getReasons(): Observable<Reason[]> {
    return this.http.get(this._baseUrl + 'reason')
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  getReason(id): Observable<Reason> {
    return this.http.get(this._baseUrl + 'reason/' + id)
      .map((res: Response) => {
        return res.json();
      }).catch(this.handleError);
  }

  addReason(reason): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._baseUrl + 'reason/', JSON.stringify(reason), {
      headers: headers
    })
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  updateReason(reason): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this._baseUrl + 'reason/' + reason.id, JSON.stringify(reason), {
      headers: headers
    })
      .map((res: Response) => {
        return;
      })
      .catch(this.handleError);
  }

  deleteReason(id): Observable<any> {
    return this.http.delete(this._baseUrl + 'reason/' + id)
      .map((res: Response) => {
        return;
      })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    var applicationError = error.headers.get('Application-Error');
    var serverError = error.json();
    var modelStateErrors: string = '';

    if (!serverError.type) {
      console.log(serverError);
      for (var key in serverError) {
        if (serverError[key])
          modelStateErrors += serverError[key] + '\n';
      }
    }

    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

    return Observable.throw(applicationError || modelStateErrors || 'Server error');
  }
}