import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Request} from '../../_models/request';
import {RequestPatch} from '../../_models/request-patch';
import {ActionProgressPatch} from '../../_models/action-progress-patch';
import {StatusService} from '../../_services/status.service';
import {RequestService} from '../../_services/request.service';

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.css']
})
export class EditRequestComponent implements OnInit {

  @Input() request: Request;
  requestPatch: RequestPatch;
  requestProgressPatch: ActionProgressPatch;

  constructor(
    public modal: NgbActiveModal,
    public statusService: StatusService,
    private requestService: RequestService
  ) { }

  submitUpdate() {
    this.requestService.updateRequest(this.request.id, this.requestPatch).subscribe(x => {
      this.modal.close(x);
    });
  }

  submitUpdateProgress() {
    if(this.requestProgressPatch.statusCode && this.requestProgressPatch.statusCode !== '') {
      this.requestService.updateRequestProgress(this.request.id, this.requestProgressPatch).subscribe(x => {
        this.modal.close(x);
      });
    }
  }

  ngOnInit(): void {
    this.requestProgressPatch = new ActionProgressPatch();
    this.requestPatch = new RequestPatch();
    this.requestPatch.description = this.request.description;
  }

}
