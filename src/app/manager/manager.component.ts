import { Component, OnInit } from '@angular/core';
import {Request} from '../_models/request';
import {RequestService} from '../_services/request.service';
import {ObjectService} from '../_services/object.service';
import {ObjectGet} from '../_models/object-get';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewRequestComponent} from './new-request/new-request.component';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ObjectPost} from '../_models/object-post';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  requests: Request[];
  objects: ObjectGet[];
  objects$: Observable<ObjectGet[]>;
  selectedObjectId: number;

  constructor(
    private requestService: RequestService,
    public objectService: ObjectService,
    private modalService: NgbModal
  ) { }

  selectObject(selectedObjectId: string) {
    this.selectedObjectId = parseInt(selectedObjectId, 10);
    let ob: Observable<any> = null;

    if(this.selectedObjectId === 0)
      this.requests = [];
     else if(this.selectedObjectId === -1)
      ob = this.requestService.getRequests();
     else
      ob = this.requestService.getRequestsByObjectId(this.selectedObjectId);

    if(ob)
      ob.subscribe(x => {
        this.requests = x;
      });
  }

  launchNewRequest() {
    const newRequestModal = this.modalService.open(NewRequestComponent, {backdrop: 'static', size: 'lg'});
    //newRequestModal.componentInstance.objects = this.objects;
    if(this.selectedObjectId !== -1)
      newRequestModal.componentInstance.selectedObjectId = this.selectedObjectId;
    newRequestModal.result.then(x => {
      if(this.selectedObjectId === -1 || (x as Request).objectId === this.selectedObjectId)
        this.requests.unshift(x);
    }).catch(e => {});
  }


  /*getObject(objectId: number): ObjectGet {
    return this.objects.find(x => x.id === objectId);
  }*/

  getObject(objects: ObjectGet[], objectId): ObjectGet {
    return this.objects.find(x => x.id === objectId);
  }

  onRequestRemove(request: Request) {
    const index = this.requests.findIndex(x => x.id === request.id);
    if (index > -1)
      this.requests.splice(index, 1);
  }

  onRequestEdit(request: Request) {
    const index = this.requests.findIndex(x => x.id === request.id);
    if (index > -1)
      this.requests[index] = request;
  }

  test() {

    this.requests = this.requests.sort((r1, r2) => {
      if (r1.description > r2.description) {
        return 1;
      }
      else
      if (r1.description < r2.description) {
        return -1;
      }
    });
  }

  ngOnInit(): void {
    this.objects$ = this.objectService.getObjects();
    /*this.objectService.getObjects().subscribe(result => {
      this.objects = result;
    });*/
  }

}
