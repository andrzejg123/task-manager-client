import { Component, OnInit } from '@angular/core';
import {ActivityBaseComponent} from '../../activity-base/activity-base.component';
import {ActivityService} from '../../_services/activity.service';
import {StatusService} from '../../_services/status.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-activity-in-worker',
  templateUrl: './activity-in-worker.component.html',
  styleUrls: ['./activity-in-worker.component.css']
})
export class ActivityInWorkerComponent extends ActivityBaseComponent implements OnInit {

  constructor(
    activityService: ActivityService,
    statusService: StatusService,
    modalService: NgbModal,
  ) { super(activityService, statusService, modalService); }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
