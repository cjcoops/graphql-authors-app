import React from 'react';
import { toaster } from 'evergreen-ui';

import Mutation from './Mutation.jsx';
import EditAuthor from '../components/Author.jsx'

import updateAuthor from '../graphql/updateAuthor.js';

class EditAuthorContainer extends React.Component {
    state = {
        author: this.props.author,
    };

    handleUpdate = (field) => {
        this.setState(({ author }) => ({
            author: {
                ...author,
                ...field,
            }
        }));
    };

    handleSave = (mutate) => {
        const { id, firstName, lastName} = this.state.author;
        mutate({
            variables: {
                id: id,
                author: {
                    firstName,
                    lastName,
                },
            }
        });
    };

    render() {
        return (
            <Mutation
                mutation={updateAuthor}
                onCompleted={() => toaster.success('Author updated!')}
            >
                {(mutate, { loading }) => (
                    <EditAuthor
                        isLoading={loading}
                        author={this.state.author}
                        onUpdate={this.handleUpdate}
                        onSave={() => this.handleSave(mutate)}
                    />
                )}
            </Mutation>
        );
    }
}
export default EditAuthorContainer;