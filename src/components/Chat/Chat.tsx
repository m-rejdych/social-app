import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {
  Fab,
  makeStyles,
  useTheme,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
} from '@material-ui/core';
import RateReviewIcon from '@material-ui/icons/RateReview';
import CloseIcon from '@material-ui/icons/Close';

import MessagesList from '../MessagesList';
import FriendsList from '../FriendsList';
import Message from '../../types/Message';
import { Timestamp } from '../../firebase';
import { RootState } from '../../store/reducers';
import { User } from '../../store/types/usersTypes';
import { sendMessage } from '../../shared/interactions';
import { setOpen, setTarget } from '../../store/actions';

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'absolute',
    bottom: '-5%',
    right: '110%',
    width: 300,
    height: 450,
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    boxShadow: theme.shadows[3],
  },
  cardContent: {
    flexGrow: 1,
    overflow: 'auto',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  borderRadius: {
    borderRadius: 20,
  },
  friendsList: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    zIndex: 1,
    borderRadius: '0 0 20px 20px',
  },
}));

const Chat: React.FC = () => {
  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filteredFriends, setFilteredFriends] = useState<User[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const target = useSelector((state: RootState) => state.chat.target);
  const friends = useSelector((state: RootState) => state.profile.friends);
  const messages = useSelector((state: RootState) => state.profile.messages);
  const firstName = useSelector((state: RootState) => state.auth.firstName);
  const lastName = useSelector((state: RootState) => state.auth.lastName);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const open = useSelector((state: RootState) => state.chat.open);
  const cardContentRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();

  useEffect(
    () => () => {
      setIsSearchFocused(false);
    },
    [],
  );

  useEffect(() => {
    if (cardContentRef?.current) {
      cardContentRef.current.scrollTop = cardContentRef.current.scrollHeight;
    }
  }, [cardContentRef, messages, target]);

  const findUserName = (): string => {
    const { firstName, lastName }: User = friends.find(
      ({ userId }) => userId === target,
    )!;
    return `${firstName} ${lastName}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    setValue(e.target.value);
  };

  const filterUsers = (value: string) => {
    if (value) {
      const filteredUsers = friends.filter(
        ({ firstName, lastName }) =>
          `${firstName} ${lastName}`
            .toLowerCase()
            .indexOf(value.toLowerCase()) !== -1,
      );
      setFilteredFriends(filteredUsers);
    }
  };

  const handleSearchValueChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    setSearchValue(e.target.value);
    filterUsers(e.target.value);
  };

  const toggleIsFocused = (): void => {
    setIsSearchFocused((prev) => !prev);
  };

  const handleSendMessage = (): void => {
    const message: Message = {
      id: uuid(),
      messageText: value,
      from: `${firstName} ${lastName}`,
      fromUserId: userId,
      toUserId: target,
      isSeen: false,
      timestamp: Timestamp.now(),
    };
    sendMessage(message);
    setValue('');
  };

  const handleToggleChat = (): void => {
    dispatch(setOpen(!open));
    dispatch(setTarget(''));
  };

  return (
    <Box position="fixed" bottom={theme.spacing(2)} right={theme.spacing(2)}>
      <Fab color="secondary" onClick={handleToggleChat}>
        <RateReviewIcon
          fontSize="large"
          htmlColor={theme.palette.background.default}
        />
      </Fab>
      {open && (
        <Card elevation={5} className={classes.card}>
          <CardHeader
            title={
              target ? (
                findUserName()
              ) : (
                <Box position="relative">
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={searchValue}
                    onFocus={toggleIsFocused}
                    onBlur={toggleIsFocused}
                    onChange={handleSearchValueChange}
                    InputProps={{
                      startAdornment: (
                        <Typography variant="body2">To:</Typography>
                      ),
                    }}
                  />
                  {isSearchFocused &&
                    searchValue.length > 0 &&
                    filteredFriends.length > 0 && (
                      <Box
                        position="absolute"
                        top="100%"
                        left={0}
                        className={classes.friendsList}
                      >
                        <FriendsList friends={filteredFriends} setTarget />
                      </Box>
                    )}
                </Box>
              )
            }
            className={classes.cardHeader}
            classes={{ action: classes.alignSelfCenter }}
            action={
              <IconButton onClick={handleToggleChat}>
                <CloseIcon color="action" />
              </IconButton>
            }
          />
          {target && (
            <>
              <CardContent ref={cardContentRef} className={classes.cardContent}>
                <MessagesList messages={messages[target]} />
              </CardContent>
              <CardActions>
                <TextField
                  multiline
                  fullWidth
                  rows={2}
                  rowsMax={2}
                  value={value}
                  variant="outlined"
                  onChange={handleChange}
                  InputProps={{
                    className: classes.borderRadius,
                    endAdornment: (
                      <Button onClick={handleSendMessage} color="secondary">
                        SEND
                      </Button>
                    ),
                  }}
                ></TextField>
              </CardActions>
            </>
          )}
        </Card>
      )}
    </Box>
  );
};

export default Chat;
