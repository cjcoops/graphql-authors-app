export interface Author {
  firstName: string;
  lastName: string;
  id: number;
  dateOfBirth: string;
  books: Book[];
}

export interface Book {
  id: number;
  title: string;
  publisher: string;
  edition: string;
  authorId: number;
  author: Author;
}
