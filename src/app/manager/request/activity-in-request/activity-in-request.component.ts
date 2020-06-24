import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivityGet} from '../../../_models/activity-get';
import {Status} from '../../../_models/status';
import {User} from '../../../_models/user';
import {ActivityType} from '../../../_models/activity-type';
import {ActivityService} from '../../../_services/activity.service';
import {UserService} from '../../../_services/user.service';
import {EditRequestComponent} from '../../edit-request/edit-request.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditActivityComponent} from '../../../edit-activity/edit-activity.component';
import {ActivityBaseComponent} from '../../../activity-base/activity-base.component';
import {take} from 'rxjs/operators';
import {StatusService} from '../../../_services/status.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-activity-in-request',
  templateUrl: './activity-in-request.component.html',
  styleUrls: ['./activity-in-request.component.css']
})
export class ActivityInRequestComponent extends ActivityBaseComponent implements OnInit {

  @Output() removed = new EventEmitter<ActivityGet>();
  workers$: Observable<User[]>;
  currentWorker: User;

  constructor(
    activityService: ActivityService,
    statusService: StatusService,
    modalService: NgbModal,
    private userService: UserService
  ) { super(activityService, statusService, modalService); }

  getWorker() {
    if(!this.currentWorker)
      this.currentWorker = this.userService.getUserById(this.activity.workerId);

    return this.currentWorker;
  }

  remove() {
    if(confirm('Are you sure?')) {
      this.activityService.deleteActivity(this.activity.id).subscribe(x => {
        this.removed.emit(this.activity);
      });
    }
  }

  toggleOpen() {
    super.toggleOpen();
    if(!this.workers$) {
      /*this.userService.fetchUsers().pipe(take(1)).subscribe(_ => {
        //workers are ready when users are fetched
        this.workers = this.userService.getWorkers();
      });*/
      this.userService.fetchUsers();
      this.workers$ = this.userService.getWorkers();
    }
  }

  ngOnInit(): void {
    super.ngOnInit();

  }

}
