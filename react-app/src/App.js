import React from 'react';
import { Pane, Heading } from 'evergreen-ui';

import Authors from './containers/Authors.jsx';

class App extends React.Component {
    render() {
        return (
            <Pane>
                <Heading
                    padding={16}
                >
                    Authors and their Books
                </Heading>
                <Authors />
            </Pane>
        )
    }
}

export default App;
