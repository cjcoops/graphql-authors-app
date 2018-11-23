import { DeleteBookGQL } from './../../graphql/deleteBook';
import { AddBookGQL } from './../../graphql/addBook';
import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAuthorsGQL } from 'src/app/graphql/getAuthors';
import { Author, Book } from 'src/app/models';
import { UpdateAuthor } from 'src/app/graphql/updateAuthor';
import { UpdateBook } from 'src/app/graphql/updateBook';

@Component({
  selector: 'app-author-container',
  templateUrl: './author-container.component.html',
  styleUrls: ['./author-container.component.css']
})
export class AuthorContainerComponent implements OnInit {
  data: Observable<any>;
  showEditAuthor = false;
  showEditBook = false;
  activeAuthor: Author;
  activeBook: Book;
  searchName: string;

  constructor(
    private getAuthorsGQL: GetAuthorsGQL,
    private apollo: Apollo,
    private addBookGQL: AddBookGQL,
    private deleteBookGQL: DeleteBookGQL
  ) {}

  ngOnInit() {
    this.data = this.getAuthorsGQL.watch().valueChanges;
  }

  handleEditAuthor(author: Author) {
    this.showEditBook = false;
    this.activeBook = undefined;
    this.showEditAuthor = true;
    this.activeAuthor = author;
  }

  handleEditBook(book: Book) {
    this.showEditAuthor = false;
    this.activeAuthor = undefined;
    this.showEditBook = true;
    this.activeBook = book;
  }

  handleAddBook(author: Author) {
    this.showEditAuthor = false;
    this.activeAuthor = author;
    this.showEditBook = true;
    this.activeBook = undefined;
  }

  handleSearchNameChange(name: string) {
    this.data = this.getAuthorsGQL.watch({
      firstName: name
    }).valueChanges;
  }

  handleUpdateAuthor({ firstName, lastName }: Partial<Author>) {
    this.apollo
      .mutate({
        mutation: UpdateAuthor,
        variables: {
          id: this.activeAuthor.id,
          author: { firstName, lastName }
        }
      })
      .subscribe(() => {
        this.activeAuthor = undefined;
        this.showEditAuthor = false;
      });
  }

  handleUpdateBook({ title, publisher, edition }: Partial<Book>) {
    this.apollo
      .mutate({
        mutation: UpdateBook,
        variables: {
          id: this.activeBook.id,
          book: { title, publisher, edition }
        }
      })
      .subscribe(() => {
        this.activeBook = undefined;
        this.showEditBook = false;
      });
  }

  handleCreateBook(book: Partial<Book>) {
    book.authorId = this.activeAuthor.id;
    this.addBookGQL
      .mutate(
        {
          book
        },
        {
          update: (store, { data: { addBook } }) => {
            const data = store.readQuery({
              query: this.getAuthorsGQL.document
            });
            const author = findById(data['authors'], addBook.authorId);
            author.books.push(addBook);
            store.writeQuery({
              query: this.getAuthorsGQL.document,
              data
            });
          }
        }
      )
      .subscribe(() => {
        this.activeAuthor = undefined;
        this.showEditBook = false;
      });
  }

  handleDeleteBook(book: Partial<Book>) {
    this.deleteBookGQL
      .mutate(
        {
          id: book.id
        },
        {
          update: (store, { data: { id } }) => {
            const data = store.readQuery({
              query: this.getAuthorsGQL.document
            });
            const author = findById(data['authors'], book.authorId);
            const index = author.books.findIndex(item => item.id === id);
            author.books.splice(index, 1);
            store.writeQuery({
              query: this.getAuthorsGQL.document,
              data
            });
          }
        }
      )
      .subscribe(() => {
        this.activeAuthor = undefined;
        this.showEditBook = false;
      });
  }
}

const findById = (items, id) => items.find(item => item.id === id);
