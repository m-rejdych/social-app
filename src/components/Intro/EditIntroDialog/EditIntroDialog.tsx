import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import countryList from 'react-select-country-list';
import { Formik, Field, FieldProps } from 'formik';
import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import CloseIcon from '@material-ui/icons/Close';

import { setProfileIntro, getProfileData } from '../../../store/actions';
import { ProfileIntro } from '../../../store/types/profileTypes';
import { RootState } from '../../../store/reducers';
import { KEYS } from '../../../shared/constants';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(1),
  },
  marginBottom: {
    marginBottom: theme.spacing(3),
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
}));

interface Props {
  open: boolean;
  handleClose: () => void;
}

const EditIntroDialog: React.FC<Props> = ({ open, handleClose }) => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const location = useSelector((state: RootState) => state.profile.location);
  const country = useSelector((state: RootState) => state.profile.country);
  const education = useSelector((state: RootState) => state.profile.education);
  const hobbies = useSelector((state: RootState) => state.profile.hobbies);
  const loading = useSelector((state: RootState) => state.profile.loading);
  const classes = useStyles();
  const dispatch = useDispatch();

  const countries = countryList().getData();

  const fields = [
    {
      icon: <HomeIcon className={classes.marginRight} />,
      name: 'location',
      label: 'Location',
      type: 'text',
    },
    {
      icon: <LocationOnIcon className={classes.marginRight} />,
      name: 'country',
      label: 'Country',
      type: 'select',
    },
    {
      icon: <MenuBookIcon className={classes.marginRight} />,
      name: 'education',
      label: 'Education',
      type: 'text',
    },
    {
      icon: <FlashOnIcon className={classes.marginRight} />,
      name: 'hobbies',
      label: 'Hobbies',
      type: 'text',
    },
  ];

  const initialValues = {
    location: location || '',
    country: country || '',
    education: education || '',
    hobbies: hobbies || '',
  };

  const handleSubmit = (values: Omit<ProfileIntro, 'userId'>): void => {
    dispatch(setProfileIntro({ userId, ...values }));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle disableTypography className={classes.dialogTitle}>
        <Typography variant="h5">Edit intro</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ values }) => (
          <>
            <DialogContent className={classes.dialogContent}>
              {fields.map(({ icon, name, label, type }) => (
                <Field key={`edit_${name}`} name={name}>
                  {({ field }: FieldProps) =>
                    type === 'text' ? (
                      <TextField
                        {...field}
                        variant="outlined"
                        label={label}
                        fullWidth
                        type={type}
                        InputProps={{ startAdornment: icon }}
                        className={classes.marginBottom}
                        onKeyPress={(e) =>
                          e.key === KEYS.ENTER && handleSubmit(values)
                        }
                      />
                    ) : (
                      <Select
                        {...field}
                        autoWidth
                        fullWidth
                        startAdornment={icon}
                        variant="outlined"
                        name={name}
                        label={label}
                        className={classes.marginBottom}
                      >
                        {countries.map(({ value, label }: any) => (
                          <MenuItem key={value} value={value}>
                            {label}
                          </MenuItem>
                        ))}
                      </Select>
                    )
                  }
                </Field>
              ))}
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
              <Button
                size="large"
                color="primary"
                variant="contained"
                onClick={() => handleSubmit(values)}
              >
                {loading ? (
                  <CircularProgress size={24} color="secondary" />
                ) : (
                  'Edit intro'
                )}
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditIntroDialog;
