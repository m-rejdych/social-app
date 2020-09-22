import React from 'react';
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
} from '@material-ui/core';
import countryList from 'react-select-country-list';
import { Formik, Field, FieldProps } from 'formik';
import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import CloseIcon from '@material-ui/icons/Close';

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
  const classes = useStyles();

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

  const countries = countryList().getData();

  const initialValues = {
    location: '',
    country: '',
    education: '',
    hobbies: '',
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
                <Field key={name} name={name}>
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
              <Button size="large" color="primary" variant="contained">
                Edit intro
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditIntroDialog;
