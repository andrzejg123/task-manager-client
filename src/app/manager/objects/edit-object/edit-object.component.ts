import {Component, Input, OnInit} from '@angular/core';
import {ObjectService} from '../../../_services/object.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ObjectGet} from '../../../_models/object-get';
import {ObjectPatch} from '../../../_models/object-patch';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-edit-object',
  templateUrl: './edit-object.component.html',
  styleUrls: ['./edit-object.component.css']
})
export class EditObjectComponent implements OnInit {

  @Input() object: ObjectGet;
  objectPatch = new ObjectPatch();

  constructor(
    private objectService: ObjectService,
    public modal: NgbActiveModal
  ) { }

  submit() {
    this.objectService.updateObject(this.object.id, this.objectPatch).pipe(take(1)).subscribe(x => {
      this.modal.close(x);
    });
  }

  ngOnInit(): void {
    this.objectPatch.name = this.object.name;
  }

}
