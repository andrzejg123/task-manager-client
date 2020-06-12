import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Request} from '../../_models/request';
import {Status} from '../../_models/status';
import {StatusService} from '../../_services/status.service';
import {ActivityGet} from '../../_models/activity-get';
import {ActivityService} from '../../_services/activity.service';
import {ObjectGet} from '../../_models/object-get';
import {UserService} from '../../_services/user.service';
import {RequestService} from '../../_services/request.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditRequestComponent} from '../edit-request/edit-request.component';
import {NewActivityComponent} from './new-activity/new-activity.component';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  @Input() request: Request;
  @Input() object: ObjectGet;
  @Output() removed = new EventEmitter<Request>();
  @Output() edited = new EventEmitter<Request>();
  statuses: Status[];
  isOpened = false;
  openButtonLabel = 'Open';
  activities: ActivityGet[];

  constructor(public statusService: StatusService,
              private activityService: ActivityService,
              private userService: UserService,
              private requestService: RequestService,
              private modalService: NgbModal
              ) {
  }

  launchEdit() {
    const newRequestModal = this.modalService.open(EditRequestComponent, {backdrop: 'static', size: 'lg'});
    newRequestModal.componentInstance.request = this.request;
    newRequestModal.result.then(x => {
      this.request = x;
      this.edited.emit(this.request);
    }).catch(e => {});
  }

  launchNewActivity() {
    const newActivityModal = this.modalService.open(NewActivityComponent, {backdrop: 'static', size: 'lg'});
    newActivityModal.componentInstance.request = this.request;
    newActivityModal.result.then(x => {
      this.activities.unshift(x);
    }).catch(e => {});
  }

  remove() {
    if(confirm('Are you sure?')) {
      this.requestService.deleteRequest(this.request.id).subscribe(x => {
        this.removed.emit(this.request);
      });
    }
  }

  toggleOpen() {
    this.isOpened = !this.isOpened;
    this.openButtonLabel = (this.isOpened ? 'Close' : 'Open');
    if(!this.activities) {
      this.activityService.getRequestActivities(this.request.id).subscribe(x => {
        this.activities = x;
      });
    }
  }

  onActivityRemove(activity: ActivityGet) {
    const index = this.activities.findIndex(x => x.id === activity.id);
    if (index > -1)
      this.activities.splice(index, 1);
  }

  onActivityEdit(activity: ActivityGet) {
    const index = this.activities.findIndex(x => x.id === activity.id);
    if (index > -1)
      this.activities[index] = activity;

  }

  getStatus(code: string): Status {
    return this.statuses.find(x => x.code === code);
  }

  ngOnInit(): void {
    this.statusService.getStatuses().pipe(take(1)).subscribe(x => {
      this.statuses = x;
    });
  }

}
