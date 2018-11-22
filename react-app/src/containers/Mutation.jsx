import React from 'react';
import { Mutation } from 'react-apollo';
import { toaster } from 'evergreen-ui';

export default (props) => (
    <Mutation
        onCompleted={() => toaster.success('Success!')}
        {...props}
    >
        {(mutate, { error, ...data }) => {
            if (error) {
                toaster.danger('Error!');
            }
            return props.children(mutate, data)
        }}
    </Mutation>
);