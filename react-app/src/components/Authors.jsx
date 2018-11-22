import React from 'react';
import { Pane, Table, IconButton, UnorderedList, ListItem, Link } from 'evergreen-ui'

const Authors = ({ authors, onShowAuthor, onShowBook }) => (
    <Pane padding={16}>
        <Table>
            <Table.Head padding={16} >
                <Table.HeaderCell flexGrow={0.15} >
                    Edit
                </Table.HeaderCell>
                <Table.HeaderCell>First Name</Table.HeaderCell>
                <Table.HeaderCell>Last Name</Table.HeaderCell>
                <Table.HeaderCell>Books</Table.HeaderCell>
            </Table.Head>
            <Table.Body>
            {authors.map(author =>
                <Table.Row
                    key={author.id}
                    padding={16}
                    height="auto"
                >
                    <Table.TextCell flexGrow={0.15} >
                        <IconButton
                            icon="edit"
                            onClick={() => onShowAuthor(author)}
                        />
                    </Table.TextCell>
                    <Table.TextCell>{author.firstName}</Table.TextCell>
                    <Table.TextCell>{author.lastName}</Table.TextCell>
                    <Table.TextCell >
                        {author.books.map(book =>
                            <UnorderedList key={book.id} >
                                <ListItem>
                                    <Link
                                        onClick={() => onShowBook(book)}
                                    >
                                        {book.title}
                                    </Link>
                                    </ListItem>
                            </UnorderedList>
                        )}
                    </Table.TextCell>
                </Table.Row>
            )}
            </Table.Body>
        </Table>
    </Pane>
);
export default Authors;
