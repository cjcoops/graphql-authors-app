import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Author, Book } from 'src/app/models';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {
  @Input() authors: Author[];
  @Output() editAuthor = new EventEmitter<Author>();
  @Output() editBook = new EventEmitter<Book>();
  @Output() addBook = new EventEmitter<Author>();
}
