import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../_services/user.service';
import {UserPost} from '../../_models/user-post';
import {Role} from '../../_models/role';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  roles$: Observable<Role[]>;
  userPost: UserPost = new UserPost();

  constructor(
    public modal: NgbActiveModal,
    private userService: UserService

  ) { }

  submit() {
    if(this.userPost.roleCode === 'null')
      this.userPost.roleCode = null;
    
    this.userService.registerUser(this.userPost).pipe(take(1)).subscribe(x => {
      this.modal.close(x);
    });
  }

  ngOnInit(): void {
    this.roles$ = this.userService.getRoles();
  }
}
