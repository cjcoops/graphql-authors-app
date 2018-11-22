import React from 'react';
import { Pane, TextInputField, Button, Heading } from 'evergreen-ui'

export default ({ book, onUpdate, onSave, isLoading }) => (
    <Pane
        padding={16}
        display="flex"
        flexDirection="column"
        height="100%"
        background="tint2"
    >
        <Heading paddingBottom={16} >
            Update Book
        </Heading>
        <TextInputField
          label="Title"
          value={book.title}
          onChange={e => onUpdate({title: e.target.value })}
        />
        <TextInputField
          label="Publisher"
          value={book.publisher}
          onChange={e => onUpdate({publisher: e.target.value })}
        />
        <TextInputField
          label="Edition"
          value={book.edition}
          onChange={e => onUpdate({edition: e.target.value })}
        />
        <Button
            isLoading={isLoading}
            appearance="primary"
            intent="none"
            onClick={() => onSave()}
        >
            Update Book
        </Button>
    </Pane>
);