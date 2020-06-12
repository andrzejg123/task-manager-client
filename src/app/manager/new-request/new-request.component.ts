import {Component, Input, OnInit} from '@angular/core';
import {ObjectGet} from '../../_models/object-get';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {RequestPost} from '../../_models/request-post';
import {RequestService} from '../../_services/request.service';
import {Form} from '@angular/forms';
import {Observable} from 'rxjs';
import {ObjectService} from '../../_services/object.service';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent implements OnInit {

  //@Input() objects: ObjectGet[];
  @Input() selectedObjectId;
  objects$: Observable<ObjectGet[]>;
  requestPost = new RequestPost();

  constructor(
    public modal: NgbActiveModal,
    private requestService: RequestService,
    private objectService: ObjectService
  ) { }

  submit() {
    this.requestService.createRequest(this.requestPost).subscribe(x => {
      this.modal.close(x);
    });
  }

  ngOnInit(): void {
    this.requestPost.objectId = this.selectedObjectId;
    this.objects$ = this.objectService.getObjects();
  }

}
