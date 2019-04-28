import {Component, OnInit, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LibraryService } from 'src/app/services/library.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'create-music',
  templateUrl: './create-music.component.html',
  styleUrls: ['./create-music.component.less']
})
export class CreateMusicComponent implements OnInit {
  private readonly LIBRARY_URL = 'http://localhost:3000/library';

  private form: FormGroup;

  @Input() parent: any;
  
  constructor(private activeModal: NgbActiveModal,
              private libraryService: LibraryService,
              private formBuilder: FormBuilder) {
          
      this.form = this.formBuilder.group({});
  }

  ngOnInit() {
    this.buildFormModel();
  }

  /**
   * Post a music using Form values.
   */
  submit() {
    this.libraryService.post(this.LIBRARY_URL, this.form.value)
      .subscribe(res => {
        console.log('submitted');
        this.parent.refreshView();
        this.activeModal.close('Saved');
      });
  }

  /**
   * Build Form Controls for each field.
   */
  private buildFormModel() {
    let model = {};

    model['title'] = ['', Validators.required];
    model['artist'] = ['', Validators.required];
    model['album'] = ['', Validators.required];
    model['genre'] = ['', Validators.required];
    model['releaseDate'] = ['', Validators.required];
    model['description'] = ['', Validators.required];

    this.form = this.formBuilder.group(model);
  }
}
