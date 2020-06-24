import { Component, OnInit } from '@angular/core';
import {User} from '../../_models/user';
import {ObjectGet} from '../../_models/object-get';
import {Observable} from 'rxjs';
import {ObjectService} from '../../_services/object.service';
import {ObjectTypeGet} from '../../_models/object-type-get';
import {UserService} from '../../_services/user.service';
import {take} from 'rxjs/operators';
import {NewRequestComponent} from '../new-request/new-request.component';
import {Request} from '../../_models/request';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewObjectComponent} from './new-object/new-object.component';
import {EditObjectComponent} from './edit-object/edit-object.component';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css']
})
export class ObjectsComponent implements OnInit {

  objects$: Observable<ObjectGet[]>;
  //objectTypes$: Observable<ObjectTypeGet[]>;
  //clients: User[];
  clients$: Observable<User[]>;

  constructor(
    public objectService: ObjectService,
    public userService: UserService,
    private modalService: NgbModal
  ) { }

  launchNewObject() {
    const newObjectModal = this.modalService.open(NewObjectComponent, {backdrop: 'static', size: 'lg'});
    //newObjectModal.componentInstance.clients = this.clients;
    newObjectModal.result.then(x => {}).catch(e => {});
  }

  getClient(clients: User[], clientId: number): User {
    return clients.find(x => x.id === clientId);
  }

  launchEdit(object: ObjectGet) {
    const editObjectModal = this.modalService.open(EditObjectComponent, {backdrop: 'static', size: 'lg'});
    editObjectModal.componentInstance.object = object;
    editObjectModal.result.then(x => {}).catch(e => {});
  }

  remove(object: ObjectGet) {
    if(confirm('Are you sure?'))
      this.objectService.deleteObject(object.id);

  }

  ngOnInit(): void {
    this.objects$ = this.objectService.getObjects();
    this.objectService.getObjectTypes();
    /*this.userService.fetchUsers().pipe(take(1)).subscribe(x => {
      this.clients = this.userService.getClients();
    });*/
    this.userService.fetchUsers();
    this.clients$ = this.userService.getClients();

  }

}
