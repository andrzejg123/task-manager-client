import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {ObjectGet} from '../_models/object-get';
import {Status} from '../_models/status';
import {shareReplay, take, tap} from 'rxjs/operators';
import {ObjectPost} from '../_models/object-post';
import {ObjectTypeGet} from '../_models/object-type-get';
import {ObjectPatch} from '../_models/object-patch';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  private objectsSubject: BehaviorSubject<ObjectGet[]> = new BehaviorSubject<ObjectGet[]>([]);
  private objects$: Observable<ObjectGet[]> = this.objectsSubject.asObservable();
  private objectTypesSubject: BehaviorSubject<ObjectTypeGet[]> = new BehaviorSubject<ObjectTypeGet[]>([]);
  private objectTypes$: Observable<ObjectTypeGet[]> = this.objectTypesSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  getObjects(): Observable<ObjectGet[]> {

    /*if(!this.objects) {
      this.objects = this.http.get<ObjectGet[]>(`${environment.apiUrl}/object`).pipe(
        shareReplay()
      );
    }

    return this.objects;*/

    if(this.objectsSubject.value.length === 0) {
      this.http.get<ObjectGet[]>(`${environment.apiUrl}/object`).subscribe(x => {
        this.objectsSubject.next(x);
      });
    }

    return this.objects$;
  }

  getObjectTypes(): Observable<ObjectTypeGet[]> {

    if(this.objectTypesSubject.value.length === 0) {
      this.http.get<ObjectTypeGet[]>(`${environment.apiUrl}/object_type`).subscribe(x => {
        this.objectTypesSubject.next(x);
      });
    }

    return this.objectTypes$;
  }

  getObject(objectId: number): ObjectGet {
    return this.objectsSubject.value.find(x => x.id === objectId);
  }

  getObjectType(code: string): ObjectTypeGet {
    return this.objectTypesSubject.value.find(x => x.code === code);
  }

  createObject(objectPost: ObjectPost): Observable<ObjectGet> {
    const result = this.http.post<ObjectGet>(`${environment.apiUrl}/object`, objectPost).pipe(shareReplay());
    result.pipe(take(1)).subscribe(x => {
      const arr = this.objectsSubject.value;
      arr.push(x);
      this.objectsSubject.next(arr);
    });

    return result;
  }

  deleteObject(objectId: number): Observable<any> {
    const result = this.http.delete<any>(`${environment.apiUrl}/object/` + objectId).pipe(shareReplay());
    result.pipe(take(1)).subscribe(x => {
      const arr = this.objectsSubject.value;
      const index = arr.findIndex(y => y.id === objectId);
      arr.splice(index, 1);
      this.objectsSubject.next(arr);
    });

    return result;
  }

  updateObject(objectId: number, objectPatch: ObjectPatch): Observable<ObjectGet> {
    const result = this.http.patch<ObjectGet>(`${environment.apiUrl}/object/` + objectId, objectPatch).pipe(shareReplay());
    result.pipe(take(1)).subscribe(x => {
      const arr = this.objectsSubject.value;
      const index = arr.findIndex(y => y.id === objectId);
      arr[index] = x;
      this.objectsSubject.next(arr);
    });

    return result;
  }

}
