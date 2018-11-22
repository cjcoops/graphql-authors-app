import React from 'react';
import { Pane, TextInputField, Button, Heading } from 'evergreen-ui'

export default ({ author, onUpdate, onSave, isLoading }) => (
    <Pane
        padding={16}
        display="flex"
        flexDirection="column"
        height="100%"
        background="tint2"
    >
        <Heading paddingBottom={16} >
            Update Author
        </Heading>
        <TextInputField
          label="First Name"
          value={author.firstName}
          onChange={e => onUpdate({firstName: e.target.value })}
        />
        <TextInputField
          label="Last Name"
          value={author.lastName}
          onChange={e => onUpdate({lastName: e.target.value })}
        />
        <Button
            isLoading={isLoading}
            appearance="primary"
            intent="none"
            onClick={() => onSave()}
        >
            Update Author
        </Button>
    </Pane>
)