import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  CardActions,
  CardContent,
  Button,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import { Formik } from 'formik';

import { UserData } from '../../store/types/authTypes';
import { signUp, signIn } from '../../store/actions';
import { RootState } from '../../store/reducers';
import InputElement from './InputElement';

const useStyles = makeStyles((theme) => ({
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

interface Field {
  name: string;
  label: string;
  type: string;
  validate: (value: string) => string | void;
}

const AuthForm: React.FC = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const loading = useSelector((state: RootState) => state.auth.userId);
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialValues = isSignedUp
    ? {
        email: '',
        password: '',
      }
    : {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      };

  const fieldsConfig = [
    isSignedUp || {
      name: 'firstName',
      label: 'First name',
      type: 'text',
      validate: (value: string): string | void => {
        let errorMessage;
        if (!value) errorMessage = 'This field is required!';
        else if (value.length < 2)
          errorMessage = 'First name should be at least 2 characters long!';
        return errorMessage;
      },
    },
    isSignedUp || {
      name: 'lastName',
      label: 'Last name',
      type: 'text',
      validate: (value: string): string | void => {
        let errorMessage;
        if (!value) errorMessage = 'This field is required!';
        else if (value.length < 2)
          errorMessage = 'Last name should be at least 2 characters long!';
        return errorMessage;
      },
    },
    {
      name: 'email',
      label: 'Email address',
      type: 'email',
      validate: (value: string): string | void => {
        let errorMessage;
        if (!value) errorMessage = 'This field is required!';
        else if (
          !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value,
          )
        )
          errorMessage = 'Enter a valid email!';
        return errorMessage;
      },
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      validate: (value: string): string | void => {
        let errorMessage;
        if (!value) errorMessage = 'This field is required!';
        else if (!/^(?=.*\d).{8,}$/.test(value))
          errorMessage =
            'Password should include minimum of 8 characters and contain at least one number!';
        return errorMessage;
      },
    },
  ];

  const handleSwitch = (handleReset: () => void) => {
    setIsSignedUp((prevState) => !prevState);
    handleReset();
  };

  const handleSubmit = (userData: UserData): void => {
    isSignedUp ? dispatch(signIn(userData)) : dispatch(signUp(userData));
  };

  return (
    <Formik onSubmit={() => {}} initialValues={initialValues}>
      {({ isValid, dirty, handleReset, values }) => (
        <>
          <CardContent className={classes.cardContent}>
            {fieldsConfig
              .filter((item: Field | boolean): item is Field => item !== true)
              .map(
                (item: Field): JSX.Element => (
                  <InputElement
                    handleSubmit={handleSubmit}
                    values={values}
                    {...item}
                  />
                ),
              )}
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              disabled={!isValid || !dirty}
              color="primary"
              fullWidth
              variant="contained"
              onClick={() => handleSubmit(values)}
            >
              {isSignedUp ? 'LOG IN' : 'SIGN UP'}
            </Button>
            <Button
              onClick={() => handleSwitch(handleReset)}
              size="small"
              color="secondary"
            >
              {isSignedUp
                ? "Sign up if you don't have an account yet"
                : 'Log in, if you already have an account'}
            </Button>
          </CardActions>
          {userId && <Redirect to="/home" />}
        </>
      )}
    </Formik>
  );
};

export default AuthForm;
