import React from 'react';
import { Box, useTheme } from '@material-ui/core';

import MessageType from '../../types/Message';
import Message from './Message';

interface Props {
  messages?: MessageType[];
}

const MessagesList: React.FC<Props> = ({ messages }) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      marginTop={`${theme.spacing(2)}px`}
      flexDirection="column"
      alignItems="flex-start"
    >
      {messages &&
        messages.map((message) => <Message {...message} key={message.id} />)}
    </Box>
  );
};

export default MessagesList;
