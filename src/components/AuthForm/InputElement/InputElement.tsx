import { TextField, Box } from '@material-ui/core';
import React from 'react';
import { KEYS } from '../../../shared/constants';
import { useField } from 'formik';

import { UserData } from '../../../store/types/authTypes';

interface Props {
  label: string;
  type: string;
  name: string;
  validate: (value: string) => string | void;
  handleSubmit: (userData: UserData) => void;
  values: UserData;
}

const InputElement: React.FC<Props> = ({
  name,
  type,
  validate,
  handleSubmit,
  label,
  values,
}) => {
  const [field, { error, touched }] = useField({ name, validate, type });

  return (
    <Box width="100%" mb={3}>
      <TextField
        {...field}
        fullWidth
        type={type}
        label={label}
        variant="outlined"
        helperText={touched && error ? error : ''}
        error={!!(touched && error)}
        onKeyPress={(e) => e.key === KEYS.ENTER && handleSubmit(values)}
      />
    </Box>
  );
};

export default InputElement;
