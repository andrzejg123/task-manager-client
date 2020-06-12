import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Request} from '../_models/request';
import {Observable} from 'rxjs';
import {RequestPost} from '../_models/request-post';
import {RequestPatch} from '../_models/request-patch';
import {ActionProgressPatch} from '../_models/action-progress-patch';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient
  ) { }

  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(`${environment.apiUrl}/request`);
  }

  getRequestsByObjectId(objectId: number): Observable<Request[]> {
    return this.http.get<Request[]>(`${environment.apiUrl}/request?objectId=` + objectId);
  }

  createRequest(requestPost: RequestPost): Observable<Request> {
    return this.http.post<Request>(`${environment.apiUrl}/request`, requestPost);
  }

  deleteRequest(requestId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/request/` + requestId);
  }

  updateRequest(requestId: number, requestPatch: RequestPatch): Observable<Request> {
    return this.http.patch<Request>(`${environment.apiUrl}/request/` + requestId, requestPatch);
  }

  updateRequestProgress(requestId: number, requestProgressPatch: ActionProgressPatch): Observable<Request> {
    return this.http.patch<Request>(`${environment.apiUrl}/request/progress/` + requestId, requestProgressPatch);
  }
}
