import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { Book } from 'src/app/models';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnChanges {
  @Input() book: Book;
  @Output() updateBook = new EventEmitter<Book>();
  @Output() addBook = new EventEmitter<Book>();
  @Output() deleteBook = new EventEmitter<Book>();

  form = new FormGroup({
    title: new FormControl(''),
    publisher: new FormControl(''),
    edition: new FormControl('')
  });

  constructor() {}

  onSubmit() {
    if (this.book) {
      this.updateBook.emit(this.form.value);
    } else {
      this.addBook.emit(this.form.value);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['book']) {
      if (changes['book'].currentValue) {
        const { title, publisher, edition } = changes['book'].currentValue;
        this.form.patchValue({
          title,
          publisher,
          edition
        });
      } else {
        this.form.reset();
      }
    }
  }
}
