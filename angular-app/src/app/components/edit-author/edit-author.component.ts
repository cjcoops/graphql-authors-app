import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { Author } from 'src/app/models';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnChanges {
  @Input() author: Author;
  @Output() updateAuthor = new EventEmitter<Author>();

  form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    const { firstName, lastName } = changes['author'].currentValue;
    this.form.patchValue({
      firstName,
      lastName
    });
  }
}
