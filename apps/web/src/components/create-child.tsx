import { InputLabel, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useCreateChildren } from '../hooks/children/create-child';
import { DEFAULT_VALUES } from './child-attributes/default';

interface IEditOrCreateChild {
  id?: string;
  firstName: string;
  lastName: string;
  attributes: any;
}

const ChildEditOrCreate = (props: IEditOrCreateChild) => {
  const editOrCreateMutation = useCreateChildren();

  const handleFormSubmission = async (values: IEditOrCreateChild) => {
    values.attributes = {
      height: DEFAULT_VALUES,
      weight: DEFAULT_VALUES,
    };
    await editOrCreateMutation.mutateAsync(values);
  };

  const formik = useFormik({
    initialValues: {
      ...props,
    },
    onSubmit: (values) => {
      handleFormSubmission(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <InputLabel>First Name</InputLabel>
        <TextField
          id="firstName"
          name="firstName"
          fullWidth
          size="small"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />

        <InputLabel>Last Name</InputLabel>
        <TextField
          id="lastName"
          name="lastName"
          fullWidth
          size="small"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
      </Stack>

      <LoadingButton
        type="submit"
        sx={{ mt: 5 }}
        loading={editOrCreateMutation.isLoading}
        fullWidth
        variant="contained"
      >
        {props.id ? 'Update User' : 'Submit'}
      </LoadingButton>
    </form>
  );
};

export default ChildEditOrCreate;
