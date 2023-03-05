import {
  Checkbox,
  CircularProgress,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useCreateUser } from '../hooks/users/useCreateUser';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { UserRoles } from '../enum/user.enum';
import { useChildren } from '../hooks/children/use-children';
import { IChild } from '@neha-project/types';

interface IUserEditOrCreate {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password?: string;
  attributes: {
    children: string[];
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const UserEditOrCreate = (props: IUserEditOrCreate) => {
  const editOrCreateMutation = useCreateUser();
  const children = useChildren();

  const handleFormSubmission = async (values: IUserEditOrCreate) => {
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

        <InputLabel>Email</InputLabel>
        <TextField
          id="email"
          name="email"
          fullWidth
          size="small"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        {!props.id && (
          <>
            <InputLabel>Password</InputLabel>
            <TextField
              id="password"
              name="password"
              fullWidth
              size="small"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </>
        )}

        <InputLabel>Role</InputLabel>
        <Select
          value={formik.values.role}
          size="small"
          variant="outlined"
          id="role"
          name="role"
          label="Role"
          onChange={formik.handleChange}
        >
          <MenuItem value={UserRoles.ADMIN}>Admin</MenuItem>
          <MenuItem value={UserRoles.NURSE}>Nurse</MenuItem>
          <MenuItem value={UserRoles.PARENT}>Parent</MenuItem>
        </Select>

        {formik.values.role !== UserRoles.ADMIN && (
          <>
            <InputLabel>Select Children</InputLabel>
            <Select
              id="attributes.children"
              name="attributes.children"
              value={formik.values.attributes.children}
              multiple
              size="small"
              onChange={formik.handleChange}
              input={<OutlinedInput label="Children" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {children.isLoading && <CircularProgress />}
              {children.data.map((child: IChild) => {
                return (
                  <MenuItem key={child._id} value={child._id}>
                    <Checkbox
                      checked={
                        formik.values.attributes.children.indexOf(child._id) >
                        -1
                      }
                    />
                    <ListItemText
                      primary={`${child.firstName} ${child.lastName}`}
                    />
                  </MenuItem>
                );
              })}
            </Select>
          </>
        )}
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

export default UserEditOrCreate;
