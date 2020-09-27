import React from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';

import { RootState } from '../../store/reducers';
import InfoPanel from './InfoPanel';
import Country from '../../types/Country';
import relationshipOptions from '../../shared/relationshipOptions';
import countries from '../../shared/countries';

interface Relationship {
  value: string;
  label: string;
}

const About: React.FC = () => {
  const email = useSelector((state: RootState) => state.auth.email);
  const firstName = useSelector((state: RootState) => state.profile.firstName);
  const lastName = useSelector((state: RootState) => state.profile.lastName);
  const location = useSelector((state: RootState) => state.profile.location);
  const country = useSelector((state: RootState) => state.profile.country);
  const education = useSelector((state: RootState) => state.profile.education);
  const hobbies = useSelector((state: RootState) => state.profile.hobbies);
  const dateOfBirth = useSelector(
    (state: RootState) => state.profile.dateOfBirth,
  );
  const proffesion = useSelector(
    (state: RootState) => state.profile.proffesion,
  );
  const relationship = useSelector(
    (state: RootState) => state.profile.relationship,
  );
  const phoneNumber = useSelector(
    (state: RootState) => state.profile.phoneNumber,
  );

  const selectedCountry: Country | undefined = countries.find(
    ({ value }: Country): boolean => value === country,
  );

  const selectedRelationship:
    | Relationship
    | undefined = relationshipOptions.find(
    ({ value }) => value === relationship,
  );

  const contentData = [
    { name: 'email', label: 'Email', value: email },
    { name: 'firstName', label: 'First name', value: firstName },
    { name: 'lastName', label: 'Last name', value: lastName },
    {
      name: 'location',
      label: 'Location',
      value: location,
    },
    {
      name: 'country',
      label: 'Country',
      value: selectedCountry?.label || 'No country information',
    },
    {
      name: 'education',
      label: 'Education',
      value: education,
    },
    {
      name: 'hobbies',
      label: 'Hobbies',
      value: hobbies,
    },
    {
      name: 'dateOfBirth',
      label: 'Date of birth',
      value: dateOfBirth,
    },
    {
      name: 'proffesion',
      label: 'Proffesion',
      value: proffesion,
    },
    {
      name: 'relationship',
      label: 'Relationship',
      value: selectedRelationship?.label || 'No relationship information',
    },
    {
      name: 'phoneNumber',
      label: 'Phone number',
      value: phoneNumber,
    },
  ];

  const initialValues = contentData.reduce((acc, { name, value }): {
    [key: string]: string;
  } => {
    if (name === 'country')
      acc[name] = selectedCountry?.value || 'No country information';
    else if (name === 'relationship')
      acc[name] = selectedRelationship?.value || 'No relationship information';
    else acc[name] = value;
    return acc;
  }, {} as { [key: string]: string });

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={() => {}}
    >
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
