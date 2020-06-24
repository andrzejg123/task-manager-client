import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {Status} from '../_models/status';
import {shareReplay, take} from 'rxjs/operators';
import {User} from '../_models/user';
import {UserPost} from '../_models/user-post';
import {Role} from '../_models/role';
import {UserPatch} from '../_models/user-patch';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: Observable<User[]>;
  private usersArray: User[];
  private workers: BehaviorSubject<User[]> = new BehaviorSubject([]);
  private clients: BehaviorSubject<User[]> = new BehaviorSubject([]);
  private managers: BehaviorSubject<User[]> = new BehaviorSubject([]);
  private workers$: Observable<User[]> = this.workers.asObservable();
  private clients$: Observable<User[]> = this.clients.asObservable();
  private managers$: Observable<User[]> = this.managers.asObservable();
  private roles: BehaviorSubject<Role[]> = new BehaviorSubject([]);
  private roles$: Observable<Role[]> = this.roles.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  fetchUsers(): Observable<User[]> {
    if(!this.users && this.workers.value.length === 0 && this.clients.value.length === 0 && this.managers.value.length === 0) {
      /*this.users = this.http.get<User[]>(`${environment.apiUrl}/user`).pipe(
        shareReplay()
      );*/
      this.users = this.http.get<User[]>(`${environment.apiUrl}/user`);

      this.users.subscribe(x => {
        this.workers.next(x.filter(y => y.roleCode === 'WOR'));
        this.clients.next(x.filter(y => y.roleCode === 'CLI'));
        this.managers.next(x.filter(y => y.roleCode === 'MAN'));

      });
    }

    return this.users;
  }

  registerUser(userPost: UserPost): Observable<User> {
    const user = this.http.post<User>(`${environment.apiUrl}/user/register`, userPost).pipe(shareReplay());
    console.log('regg');
    user.pipe(take(1)).subscribe(x => {
      let users;
      console.log('subb');
      switch (x.roleCode) {
        case 'MAN':
          users = this.managers.value;
          users.unshift(x);
          this.managers.next(users);
          console.log('mann');
          break;
        case 'WOR':
          users = this.workers.value;
          users.unshift(x);
          this.workers.next(users);
          console.log('worr');
          break;
        case 'CLI':
          users = this.clients.value;
          users.unshift(x);
          this.clients.next(users);
          console.log('clii');
          break;
        default:
          console.log('deffff');
          break;
      }
    });
    return user;
  }

  updateUser(userPatch: UserPatch): Observable<User> {
    return null;
  }

  getWorkers(): Observable<User[]> {
    /*if(!this.workers)
      this.workers = this.usersArray.filter(x => x.roleCode === 'WOR');

    return this.workers;*/
    return this.workers$;
  }

  getClients(): Observable<User[]> {
    /*if(!this.clients)
      this.clients = this.usersArray.filter(x => x.roleCode === 'CLI');

    return this.clients;*/
    return this.clients$;
  }

  getManagers(): Observable<User[]> {
    /*if(!this.managers)
      this.managers = this.usersArray.filter(x => x.roleCode === 'MAN');

    return this.managers;*/
    return this.managers$;
  }

  getUserById(userId: number): User {
    return this.clients.value.find(x => x.id === userId) ||
      this.workers.value.find(x => x.id === userId) || this.managers.value.find(x => x.id === userId);
  }

  getRoles(): Observable<Role[]> {
    if(this.roles.value.length === 0) {
      this.http.get<Role[]>(`${environment.apiUrl}/role`).subscribe(x => {
        this.roles.next(x);
      });
    }

    return this.roles$;
  }

}
