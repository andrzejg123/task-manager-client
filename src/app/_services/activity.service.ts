import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ActivityGet} from '../_models/activity-get';
import {Status} from '../_models/status';
import {shareReplay} from 'rxjs/operators';
import {ActivityType} from '../_models/activity-type';
import {ActivityPost} from '../_models/activity-post';
import {RequestPatch} from '../_models/request-patch';
import {Request} from '../_models/request';
import {ActionProgressPatch} from '../_models/action-progress-patch';
import {ActivityPatch} from '../_models/activity-patch';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private activityTypes: Observable<ActivityType[]>;

  constructor(
    private http: HttpClient
  ) {}

  getRequestActivities(requestId: number): Observable<ActivityGet[]> {
    return this.http.get<ActivityGet[]>(`${environment.apiUrl}/activity/request?requestId=` + requestId);
  }

  getWorkerActivities(): Observable<ActivityGet[]> {
    return this.http.get<ActivityGet[]>(`${environment.apiUrl}/activity/worker`);
  }

  getActivityTypes(): Observable<ActivityType[]> {
    if(!this.activityTypes) {
      this.activityTypes = this.http.get<ActivityType[]>(`${environment.apiUrl}/activity_type`).pipe(
        shareReplay()
      );

    }

    return this.activityTypes;
  }

  createActivity(activityPost: ActivityPost): Observable<ActivityGet> {
    return this.http.post<ActivityGet>(`${environment.apiUrl}/activity`, activityPost);
  }

  deleteActivity(activityId: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/activity/` + activityId);
  }

  updateActivity(activityId: number, activityPatch: ActivityPatch): Observable<ActivityGet> {
    return this.http.patch<ActivityGet>(`${environment.apiUrl}/activity/` + activityId, activityPatch);
  }

  updateActivityProgress(activityId: number, activityProgressPatch: ActionProgressPatch): Observable<ActivityGet> {
    return this.http.patch<ActivityGet>(`${environment.apiUrl}/activity/progress/` + activityId, activityProgressPatch);
  }

}
