import {Component, Input, OnInit} from '@angular/core';
import {ActivityGet} from '../_models/activity-get';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivityService} from '../_services/activity.service';
import {ActivityPatch} from '../_models/activity-patch';
import {ActionProgressPatch} from '../_models/action-progress-patch';
import {StatusService} from '../_services/status.service';
import {AuthenticationService} from '../_services/authentication.service';
import {User} from '../_models/user';
import {ActivityType} from '../_models/activity-type';
import {UserService} from '../_services/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {

  @Input() activity: ActivityGet;
  activityPatch: ActivityPatch;
  activityProgressPatch: ActionProgressPatch;
  loggedUser: User;
  workers$: Observable<User[]>;
  activityTypes: ActivityType[];

  constructor(
    public modal: NgbActiveModal,
    private activityService: ActivityService,
    public statusService: StatusService,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { }

  submitUpdate() {
    this.activityService.updateActivity(this.activity.id, this.activityPatch).subscribe(x => {
      this.modal.close(x);
    });
  }

  submitUpdateProgress() {
    this.activityService.updateActivityProgress(this.activity.id, this.activityProgressPatch).subscribe(x => {
      this.modal.close(x);
    });
  }

  ngOnInit(): void {
    this.activityPatch = new ActivityPatch();
    this.activityPatch.activityTypeCode = this.activity.activityTypeCode;
    this.activityPatch.workerId = this.activity.workerId;
    this.activityProgressPatch = new ActionProgressPatch();
    this.activityPatch.description = this.activity.description;
    this.loggedUser = this.authenticationService.currentUserValue;

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
