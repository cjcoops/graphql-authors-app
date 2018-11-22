import React from 'react';
import { toaster } from 'evergreen-ui';

import Mutation from './Mutation.jsx';
import Book from '../components/Book.jsx'

import updateBook from '../graphql/updateBook.js';

class EditBookContainer extends React.Component {
    state = {
        book: this.props.book,
    };

    handleUpdate = (field) => {
        this.setState(({ book }) => ({
            book: {
                ...book,
                ...field,
            }
        }));
    };

    handleSave = (mutate) => {
        const { id, title, publisher, edition} = this.state.book;
        mutate({
            variables: {
                id: id,
                book: {
                    title,
                    publisher,
                    edition,
                },
            }
        });
    };

    render() {
        return (
            <Mutation
                mutation={updateBook}
                onCompleted={() => toaster.success('Book updated!')}
            >
                {(mutate, { loading }) => (
                    <Book
                        isLoading={loading}
                        book={this.state.book}
                        onUpdate={this.handleUpdate}
                        onSave={() => this.handleSave(mutate)}
                    />
                )}
            </Mutation>
        );
    }
}
export default EditBookContainer;