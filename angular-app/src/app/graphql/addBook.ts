import { BookFragment } from './bookFragment';
import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AddBookGQL extends Mutation {
  document = gql`
    ${BookFragment}
    mutation addBook($book: BookInput!) {
      addBook(book: $book) {
        ...BookFragment
      }
    }
  `;
}
