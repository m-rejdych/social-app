import React from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
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
    { name: 'email', label: 'Email', value: email },
    { name: 'firstName', label: 'First name', value: firstName },
    { name: 'lastName', label: 'Last name', value: lastName },
    {
      name: 'location',
      label: 'Location',
      value: location || 'No location information',
    },
    {
      name: 'country',
      label: 'Country',
      value: selectedCountry?.label || 'No country information',
    },
    {
      name: 'education',
      label: 'Education',
      value: education || 'No education information',
    },
    {
      name: 'hobbies',
      label: 'Hobbies',
      value: hobbies || 'No hobbies information',
    },
    {
      name: 'dateOfBirth',
      label: 'Date of birth',
      value: 'No age information',
    },
    {
      name: 'proffesion',
      label: 'Proffesion',
      value: 'No proffesion information',
    },
    {
      name: 'relationship',
      label: 'Relationship',
      value: 'No relationship information',
    },
    {
      name: 'phoneNumber',
      label: 'Phone number',
      value: 'No phone number information',
    },
  ];

  const initialValues = contentData.reduce((acc, { name, value }): {
    [key: string]: string;
  } => {
    acc[name] = value;
    return acc;
  }, {} as { [key: string]: string });

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {() =>
        contentData.map(({ name, label, value }) => (
          <InfoPanel
            key={`about_${name}`}
            name={name}
            label={label}
            value={value}
          />
        ))
      }
    </Formik>
  );
};

export default About;
