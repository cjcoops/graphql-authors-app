import React from 'react';
import { Query } from 'react-apollo';
import { Spinner, toaster } from 'evergreen-ui';

export default (props) => (
    <Query
        {...props}
    >
        {({ loading, error, ...data }) => {
            if (loading) {
                return <Spinner />;
            }
            if (error) {
                toaster.danger('Error!');
                return null;
            }
            return props.children(data);
        }}
    </Query>
);






