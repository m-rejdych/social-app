import React from 'react';
import { useSelector } from 'react-redux';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
} from '@material-ui/core';
import countryList from 'react-select-country-list';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { RootState } from '../../store/reducers';

type Country = Record<'label' | 'value', string>;

const About: React.FC = () => {
  const email = useSelector((state: RootState) => state.auth.email);
  const firstName = useSelector((state: RootState) => state.auth.firstName);
  const lastName = useSelector((state: RootState) => state.auth.lastName);
  const location = useSelector((state: RootState) => state.profile.location);
  const country = useSelector((state: RootState) => state.profile.country);
  const education = useSelector((state: RootState) => state.profile.education);
  const hobbies = useSelector((state: RootState) => state.profile.hobbies);

  const countries = countryList().getData();
  const selectedCountry: Country | undefined = countries.find(
    ({ value }: Country): boolean => value === country,
  );

  const contentData = [
    { key: 'about_email', label: 'Email', value: email },
    { key: 'about_first_name', label: 'First name', value: firstName },
    { key: 'about_last_name', label: 'Last name', value: lastName },
    {
      key: 'about_location',
      label: 'Location',
      value: location || 'No location information',
    },
    {
      key: 'about_country',
      label: 'Country',
      value: selectedCountry?.label || 'No country information',
    },
    {
      key: 'about_education',
      label: 'Education',
      value: education || 'No education information',
    },
    {
      key: 'about_hobbies',
      label: 'Hobbies',
      value: hobbies || 'No hobbies information',
    },
    {
      key: 'about_date_of_birth',
      label: 'Date of birth',
      value: 'No age information',
    },
    {
      key: 'about_proffesion',
      label: 'Proffesion',
      value: 'No proffesion information',
    },
    {
      key: 'about_relationship',
      label: 'Relationship',
      value: 'No relationship information',
    },
    {
      key: 'about_phone_number',
      label: 'Phone number',
      value: 'No phone number information',
    },
  ];

  return (
    <Box>
      {contentData.map(({ key, label, value }) => (
        <Accordion key={key}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{label}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{value}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default About;
