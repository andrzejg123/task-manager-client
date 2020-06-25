import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {Observable} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewUserComponent} from './new-user/new-user.component';
import {EditUserComponent} from './edit-user/edit-user.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  managers$: Observable<User[]>;
  workers$: Observable<User[]>;
  clients$: Observable<User[]>;
  inactives$: Observable<User[]>;

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) { }

  launchNewUser() {
    const newUserModal = this.modalService.open(NewUserComponent, {backdrop: 'static', size: 'lg'});
    newUserModal.result.then(x => {}).catch(e => {});
  }

  launchEditUser(user: User) {
    const editUserModal = this.modalService.open(EditUserComponent, {backdrop: 'static', size: 'lg'});
    editUserModal.componentInstance.user = user;
    editUserModal.result.then(x => {}).catch(e => {});
  }

  ngOnInit(): void {
    this.userService.fetchUsers();
    this.managers$ = this.userService.getManagers();
    this.clients$ = this.userService.getClients();
    this.workers$ = this.userService.getWorkers();
    this.inactives$ = this.userService.getInactives();
  }

}
