import React, { useState } from 'react';
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

const useStyles = makeStyles((theme) => ({
  accordionDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

interface InfoPanelProps {
  value: string;
  type: string;
  label: string;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ type, label, value }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const classes = useStyles();

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

  const toggleIsEditing = (): void => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    setInputValue(e.target.value);
  };

  return (
    <Accordion key={`about_${type}`}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{label}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {isEditing ? (
          <TextField
            autoFocus
            type="text"
            value={inputValue}
            onChange={(e) => handleChange(e)}
          />
        ) : (
          <Typography>{value}</Typography>
        )}
        {editable.includes(type) && (
          <IconButton onClick={toggleIsEditing}>
            <EditIcon />
          </IconButton>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default InfoPanel;
