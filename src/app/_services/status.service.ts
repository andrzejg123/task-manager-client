import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Status} from '../_models/status';
import {shareReplay, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private statuses: Observable<Status[]>;
  private statusesArray: Status[];

  constructor(
    private http: HttpClient
  ) {}

  getStatuses(): Observable<Status[]> {
    if(!this.statuses) {
      this.statuses = this.http.get<Status[]>(`${environment.apiUrl}/action_status`).pipe(
        shareReplay()
      );
      this.statuses.pipe(take(1)).subscribe(x => {
        this.statusesArray = x;
      });
    }

    return this.statuses;
  }

  getChildStatuses(statusCode: string): Status[] {
    const children: Status[] = [];
    this.statusesArray.find(x => x.code === statusCode).childrenCodes.forEach(it => {
      children.push(this.statusesArray.find(y => y.code === it));
    });
    return children;
  }

}
