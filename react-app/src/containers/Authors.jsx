import React from 'react';
import { SideSheet } from 'evergreen-ui';

import Query from './Query.jsx';
import Authors from '../components/Authors.jsx'
import EditAuthor from '../containers/EditAuthor.jsx'
import EditBook from '../containers/EditBook.jsx'

import getAuthors from '../graphql/getAuthors.js';


class AuthorsContainer extends React.Component {
    state = {
        showAuthor: false,
        showBook: false,
        author: null,
    };

    handleShowAuthor = (author) => {
        this.setState({
            showAuthor: true,
            showBook: false,
            author,
            book: null,
        })
    };

    handleHideAuthor = () => this.setState({showAuthor: false, author: null});

    handleShowBook = (book) => {
        this.setState({
            showAuthor: false,
            showBook: true,
            author: null,
            book,
        })
    };

    handleHideBook = () => {
        this.setState({
            showBook: false,
            book: null,
        })
    };

    render() {
        return (
            <React.Fragment>
                <SideSheet
                    isShown={this.state.showAuthor}
                    onCloseComplete={this.handleHideAuthor}
                  >
                    <EditAuthor
                        author={this.state.author}
                    />
                </SideSheet>
                <SideSheet
                    isShown={this.state.showBook}
                    onCloseComplete={this.handleHideBook}
                  >
                    <EditBook
                        book={this.state.book}
                    />
                </SideSheet>
                <Query
                    query={getAuthors}
                >
                    {({data: {authors}}) => (
                        <Authors
                            authors={authors}
                            onShowAuthor={this.handleShowAuthor}
                            onShowBook={this.handleShowBook}
                        />
                    )}
                </Query>
            </React.Fragment>
        );
    }
}
export default AuthorsContainer;