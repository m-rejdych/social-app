import React from 'react';
import { Box } from '@material-ui/core';

import MessageType from '../../types/Message';
import Message from './Message';

interface Props {
  messages?: MessageType[];
}

const MessagesList: React.FC<Props> = ({ messages }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      {messages &&
        messages.map((message) => <Message {...message} key={message.id} />)}
    </Box>
  );
};

export default MessagesList;
