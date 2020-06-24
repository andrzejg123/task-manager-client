import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {Observable} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewUserComponent} from './new-user/new-user.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  managers$: Observable<User[]>;
  workers$: Observable<User[]>;
  clients$: Observable<User[]>;

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) { }

  launchNewUser() {
    const newRequestModal = this.modalService.open(NewUserComponent, {backdrop: 'static', size: 'lg'});
    newRequestModal.result.then(x => {}).catch(e => {});
  }

  ngOnInit(): void {
    this.userService.fetchUsers();
    this.managers$ = this.userService.getManagers();
    this.clients$ = this.userService.getClients();
    this.workers$ = this.userService.getWorkers();
  }

}
