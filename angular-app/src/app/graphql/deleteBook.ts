import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class DeleteBookGQL extends Mutation {
  document = gql`
    mutation deleteBook($id: Int!) {
      deleteBook(id: $id) {
        id
      }
    }
  `;
}
