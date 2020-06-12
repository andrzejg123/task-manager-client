import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivityGet} from '../_models/activity-get';
import {Status} from '../_models/status';
import {User} from '../_models/user';
import {ActivityType} from '../_models/activity-type';
import {ActivityService} from '../_services/activity.service';
import {UserService} from '../_services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditActivityComponent} from '../edit-activity/edit-activity.component';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-activity-base',
  template: ``
})
export class ActivityBaseComponent implements OnInit {
  @Input() activity: ActivityGet;
  @Input() statuses: Status[];
  @Output() edited = new EventEmitter<ActivityGet>();
  activityTypes: ActivityType[];
  openButtonLabel = 'Open';
  isOpened = false;

  constructor(
    protected activityService: ActivityService,
    protected modalService: NgbModal
  ) { }

  toggleOpen() {
    this.isOpened = !this.isOpened;
    this.openButtonLabel = (this.isOpened ? 'Close' : 'Open');
    if(!this.activityTypes) {
      this.activityService.getActivityTypes().pipe(take(1)).subscribe(x => {
        this.activityTypes = x;
      });
    }
  }

  getActivityType() {
    return this.activityTypes.find(x => x.code === this.activity.activityTypeCode);
  }

  getStatus(code: string): Status {
    return this.statuses.find(x => x.code === code);
  }

  launchEdit() {
    const newRequestModal = this.modalService.open(EditActivityComponent, {backdrop: 'static', size: 'lg'});
    newRequestModal.componentInstance.activity = this.activity;
    newRequestModal.result.then(x => {
      this.activity = x;
      this.edited.emit(this.activity);
    }).catch(e => {});
  }

  ngOnInit(): void {
  }

}
