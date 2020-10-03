import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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
  CircularProgress,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';

import { RootState } from '../../../store/reducers';
import { updateProfileField } from '../../../store/actions';
import { KEYS, RELATIONSHIP_OPTIONS } from '../../../shared/constants';
import countries from '../../../shared/countries';

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

interface EditElementProps {
  field: FieldInputProps<InitialValues>;
  handleSubmit: (field: FieldInputProps<InitialValues>) => void;
}

const EditElement: React.FC<EditElementProps> = ({ field, handleSubmit }) => {
  const { name } = field;

  switch (name) {
    case 'country':
      return (
        <Select {...field} fullWidth autoWidth autoFocus>
          {countries.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      );
    case 'relationship':
      return (
        <Select {...field} fullWidth autoWidth autoFocus>
          {RELATIONSHIP_OPTIONS.map(({ value, label }) => (
            <MenuItem key={`relationship_${value}`} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      );
    default:
      return (
        <TextField
          {...field}
          fullWidth
          autoFocus
          onKeyPress={(e) => e.key === KEYS.ENTER && handleSubmit(field)}
        />
      );
  }
};

const useStyles = makeStyles((theme) => ({
  accordionDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

interface InfoPanelProps {
  value: string;
  name: string;
  label: string;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ name, label, value }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [field] = useField({
    type: name === 'country' ? 'select' : 'text',
    name,
  });
  const userId = useSelector((state: RootState) => state.auth.userId);
  const profileLoading = useSelector(
    (state: RootState) => state.profile.loading,
  );
  const visitedProfileLoading = useSelector(
    (state: RootState) => state.visitedProfile.loading,
  );
  const classes = useStyles();
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const isMe = params.id === userId;

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

  const handleSubmit = ({
    name,
    value,
  }: FieldInputProps<InitialValues>): void => {
    if (isEditing) {
      dispatch(updateProfileField({ userId, fieldData: { [name]: value } }));
      setIsEditing(false);
    } else setIsEditing(true);
  };

  const renderDetails = (): JSX.Element => {
    if ((isMe && profileLoading) || (!isMe && visitedProfileLoading))
      return <CircularProgress />;
    if (isEditing)
      return <EditElement field={field} handleSubmit={handleSubmit} />;
    return <Typography>{value}</Typography>;
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{label}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {renderDetails()}
        {editable.includes(name) && isMe && (
          <IconButton onClick={() => handleSubmit(field)}>
            <EditIcon />
          </IconButton>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default InfoPanel;
