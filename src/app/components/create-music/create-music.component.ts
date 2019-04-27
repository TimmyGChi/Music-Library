import {Component, OnInit} from '@angular/core';
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
  
  
  constructor(private activeModal: NgbActiveModal,
              private libraryService: LibraryService,
              private formBuilder: FormBuilder) {
          
      this.form = this.formBuilder.group({});
  }

  ngOnInit() {
    this.buildFormModel();
  }

  submit() {
    console.log('submit');
    this.libraryService.post(this.LIBRARY_URL, this.form.value)
      .subscribe(res => {
        this.activeModal.close('Saved');
      });
  }

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
