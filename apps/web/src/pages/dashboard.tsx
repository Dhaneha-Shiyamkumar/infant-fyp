import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  CardHeader,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import UserEditOrCreate from '../components/create-user';
import { AppConfig } from '../config';
import ChildrenTable from '../layouts/children-table';
import UserDataTable from '../layouts/user-table';

const HomePage = () => {
  const [createUser, setCreateUser] = useState(false);

  return (
    <>
      <Dialog onClose={() => setCreateUser(false)} open={createUser}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            consequat consectetur enim, sed ullamcorper leo iaculis at. Mauris
            id tellus.
          </DialogContentText>

          <UserEditOrCreate
            firstName=""
            lastName=""
            // eslint-disable-next-line jsx-a11y/aria-role
            role=""
            attributes={{ children: [] }}
          />
        </DialogContent>
      </Dialog>

      <Helmet>
        <title> Dashboard | {AppConfig.name} </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <LoadingButton
              variant="contained"
              onClick={() => setCreateUser(true)}
            >
              {' '}
              Add user
            </LoadingButton>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <LoadingButton variant="contained">Add Infrants</LoadingButton>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Card>
              <CardHeader title={'User information table'} />
              <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <UserDataTable />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Card>
              <CardHeader title={'Infant ID information'} />
              <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <ChildrenTable />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
