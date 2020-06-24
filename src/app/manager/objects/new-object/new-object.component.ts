import {Component, Input, OnInit} from '@angular/core';
import {ObjectService} from '../../../_services/object.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {ObjectTypeGet} from '../../../_models/object-type-get';
import {ObjectPost} from '../../../_models/object-post';
import {take} from 'rxjs/operators';
import {User} from '../../../_models/user';
import {UserService} from '../../../_services/user.service';

@Component({
  selector: 'app-new-object',
  templateUrl: './new-object.component.html',
  styleUrls: ['./new-object.component.css']
})
export class NewObjectComponent implements OnInit {

  //@Input() clients: User[];
  clients$: Observable<User[]>;
  objectTypes$: Observable<ObjectTypeGet[]>;
  objectPost = new ObjectPost();

  constructor(
    private objectService: ObjectService,
    private userService: UserService,
    public modal: NgbActiveModal
  ) { }

  submit() {
    this.objectService.createObject(this.objectPost).pipe(take(1)).subscribe(x => {
      this.modal.close(x);
    });
  }

  ngOnInit(): void {
    this.objectTypes$ = this.objectService.getObjectTypes();
    this.clients$ = this.userService.getClients();
  }

}
