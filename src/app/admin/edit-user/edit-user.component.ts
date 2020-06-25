import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Role} from '../../_models/role';
import {UserPost} from '../../_models/user-post';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../_services/user.service';
import {take} from 'rxjs/operators';
import {UserPatch} from '../../_models/user-patch';
import {User} from '../../_models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input() user: User;
  roles$: Observable<Role[]>;
  userPatch: UserPatch = new UserPatch();

  constructor(
    public modal: NgbActiveModal,
    private userService: UserService

  ) { }

  submit() {
    if(this.userPatch.roleCode === 'null')
      this.userPatch.roleCode = null;

    if(this.userPatch.password === '')
      this.userPatch.password = null;

    this.userService.updateUser(this.userPatch, this.user).pipe(take(1)).subscribe(x => {
      this.modal.close(x);
    });
  }

  ngOnInit(): void {
    this.roles$ = this.userService.getRoles();
    this.userPatch.name = this.user.name;
    this.userPatch.surname = this.user.surname;
    this.userPatch.email = this.user.email;
    this.userPatch.roleCode = this.user.roleCode;
  }

}
