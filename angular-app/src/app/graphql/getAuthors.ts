import gql from 'graphql-tag';
import { AuthorFragment } from './authorFragment';
import { BookFragment } from './bookFragment';
import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import { Author } from '../models';

export interface Response {
  authors: Author[];
}

@Injectable({
  providedIn: 'root'
})
export class GetAuthorsGQL extends Query<Response> {
  document = gql`
    query authors($firstName: String, $lastName: String) {
      authors(firstName: $firstName, lastName: $lastName) {
        ...AuthorFragment
        books {
          ...BookFragment
        }
      }
    }
    ${AuthorFragment}
    ${BookFragment}
  `;
}
