import React from 'react';
import { useSelector } from 'react-redux';
import countryList from 'react-select-country-list';

import { RootState } from '../../store/reducers';
import InfoPanel from './InfoPanel';

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
    { type: 'email', label: 'Email', value: email },
    { type: 'firstName', label: 'First name', value: firstName },
    { type: 'lastName', label: 'Last name', value: lastName },
    {
      type: 'location',
      label: 'Location',
      value: location || 'No location information',
    },
    {
      type: 'country',
      label: 'Country',
      value: selectedCountry?.label || 'No country information',
    },
    {
      type: 'education',
      label: 'Education',
      value: education || 'No education information',
    },
    {
      type: 'hobbies',
      label: 'Hobbies',
      value: hobbies || 'No hobbies information',
    },
    {
      type: 'dateOfBirth',
      label: 'Date of birth',
      value: 'No age information',
    },
    {
      type: 'proffesion',
      label: 'Proffesion',
      value: 'No proffesion information',
    },
    {
      type: 'relationship',
      label: 'Relationship',
      value: 'No relationship information',
    },
    {
      type: 'phoneNumber',
      label: 'Phone number',
      value: 'No phone number information',
    },
  ];

  return (
    <div>
      {contentData.map(({ type, label, value }) => (
        <InfoPanel type={type} label={label} value={value} />
      ))}
    </div>
  );
};

export default About;
