import React from 'react';
import { v4 as uuid } from 'uuid';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  makeStyles,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core';
import countryList from 'react-select-country-list';
import { Formik, Field, FieldProps } from 'formik';
import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FlashOnIcon from '@material-ui/icons/FlashOn';

const useStyles = makeStyles((theme) => ({
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
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
      <DialogTitle>Edit intro</DialogTitle>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ values }) => (
          <DialogContent className={classes.cardContent}>
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
        )}
      </Formik>
    </Dialog>
  );
};

export default EditIntroDialog;
