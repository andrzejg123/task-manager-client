import { Component, OnInit } from '@angular/core';
import {ActivityGet} from '../_models/activity-get';
import {ActivityService} from '../_services/activity.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  activities: ActivityGet[];

  constructor(
    private activityService: ActivityService
  ) { }

  onActivityEdit(activity: ActivityGet) {
    const index = this.activities.findIndex(x => x.id === activity.id);
    if (index > -1)
      this.activities[index] = activity;

  }

  ngOnInit(): void {
    this.activityService.getWorkerActivities().subscribe(x => {
      this.activities = x.sort((a, b) => {
        if(a.registerDate < b.registerDate)
          return 1;
        else return -1;
      });
    });
  }

}
