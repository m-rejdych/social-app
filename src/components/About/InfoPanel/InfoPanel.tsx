import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FieldInputProps, useField } from 'formik';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Typography,
  makeStyles,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import countryList from 'react-select-country-list';

import { RootState } from '../../../store/reducers';
import { updateProfileField } from '../../../store/actions';

const useStyles = makeStyles((theme) => ({
  accordionDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

type Values =
  | 'email'
  | 'location'
  | 'country'
  | 'education'
  | 'hobbies'
  | 'dateOfBirth'
  | 'proffesion'
  | 'relationship'
  | 'phoneNumber';
type InitialValues = Record<Values, string>;

interface InfoPanelProps {
  value: string;
  name: string;
  label: string;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ name, label, value }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [field] = useField({ type: 'text', name });
  const userId = useSelector((state: RootState) => state.auth.userId);
  const classes = useStyles();
  const dispatch = useDispatch();

  const editable = [
    'location',
    'country',
    'education',
    'hobbies',
    'dateOfBirth',
    'proffesion',
    'relationship',
    'phoneNumber',
  ];

  const handleChange = ({
    name,
    value,
  }: FieldInputProps<InitialValues>): void => {
    if (isEditing) {
      dispatch(updateProfileField({ userId, fieldData: { [name]: value } }));
      setIsEditing(false);
    } else setIsEditing(true);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{label}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {isEditing ? (
          <TextField {...field} autoFocus type="text" />
        ) : (
          <Typography>{value}</Typography>
        )}
        {editable.includes(name) && (
          <IconButton onClick={() => handleChange(field)}>
            <EditIcon />
          </IconButton>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default InfoPanel;
