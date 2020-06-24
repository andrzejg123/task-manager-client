import {Component, Input, OnInit} from '@angular/core';
import {ActivityPost} from '../../../_models/activity-post';
import {User} from '../../../_models/user';
import {ActivityType} from '../../../_models/activity-type';
import {UserService} from '../../../_services/user.service';
import {ActivityService} from '../../../_services/activity.service';
import {Request} from '../../../_models/request';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.css']
})
export class NewActivityComponent implements OnInit {

  @Input() request: Request;
  activityPost = new ActivityPost();
  workers$: Observable<User[]>;
  activityTypes: ActivityType[];

  constructor(
    private userService: UserService,
    private activityService: ActivityService,
    public modal: NgbActiveModal
  ) { }

  submit() {
    this.activityService.createActivity(this.activityPost).subscribe(x => {
      this.modal.close(x);
    });
  }

  ngOnInit(): void {
    this.activityPost.requestId = this.request.id;
    /*this.userService.fetchUsers().subscribe(x => {
      this.workers = this.userService.getWorkers();
    });*/
    this.userService.fetchUsers();
    this.workers$ = this.userService.getWorkers();
    this.activityService.getActivityTypes().subscribe(x => {
      this.activityTypes = x;
    });
  }

}
