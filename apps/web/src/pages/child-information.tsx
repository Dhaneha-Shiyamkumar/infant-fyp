/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  Tab,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import ChildAttributeUpdate from '../components/child-attributes';
import ChildDetails from '../components/child-details';
import { useChild } from '../hooks/children/use-child';
import ChildVaccinationUpdate from '../components/child-attributes/vaccination';

const ChildInformationPage = () => {
  const [editWeight, setEditWeight] = useState(false);
  const [editHeight, setEditHeight] = useState(false);
  const [vaccination, setVaccination] = useState(false);

  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const { id } = useParams();
  const child = useChild(id!);

  return (
    <>
      <Dialog
        onClose={() => {
          if (editWeight) {
            setEditWeight(false);
          }
          if (editHeight) {
            setEditHeight(false);
          }
        }}
        open={editWeight || editHeight}
      >
        <DialogTitle>Edit child {editWeight ? 'Weight' : 'Height'}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            consequat consectetur enim, sed ullamcorper leo iaculis at. Mauris
            id tellus.
          </DialogContentText>

          <ChildAttributeUpdate
            childId={id!}
            type={editWeight ? 'weight' : 'height'}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={() => {
          setVaccination(false);
        }}
        open={vaccination}
      >
        <DialogTitle>Update Vaccination Details</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            consequat consectetur enim, sed ullamcorper leo iaculis at. Mauris
            id tellus.
          </DialogContentText>

          <ChildVaccinationUpdate childId={id!} />
        </DialogContent>
      </Dialog>

      <Helmet>
        <title> Dashboard | {`${child?.data?.firstName}`} </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Child Details of{' '}
          {`${child?.data?.firstName} ${child?.data?.lastName}`}
        </Typography>

        {child.isLoading && <CircularProgress />}
        {child.isSuccess && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6}>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
              >
                <Button variant="contained" onClick={() => setEditWeight(true)}>
                  Edit Weight
                </Button>

                <Button variant="contained" onClick={() => setEditHeight(true)}>
                  Edit Height
                </Button>

                <Button
                  variant="contained"
                  onClick={() => setVaccination(true)}
                >
                  Edit Vaccination details
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6} md={12}>
              <Card>
                <CardHeader title={'Child’s information'} />

                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange}>
                        <Tab label="Personal Information" value="1" />
                        <Tab label="Height vs Weight" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <ChildDetails
                        firstName={child.data.firstName}
                        lastName={child.data.lastName}
                        age={20}
                      />
                    </TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                  </TabContext>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={12}>
              <Card>
                <CardHeader
                  title={'Childs weight information'}
                  subheader={
                    'Below the graph the nurse/ user has to update information and it has to be displayed in a table after submittting'
                  }
                />

                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                  <ReactApexChart
                    type="line"
                    series={[
                      {
                        name: 'weight (kg)',
                        data: child.data.attributes.weight.map(
                          ({ value }: { value: number }) => value
                        ),
                      },
                    ]}
                    options={{
                      chart: {
                        id: 'weight-graph',
                      },
                      xaxis: {
                        categories: child.data.attributes.weight.map(
                          ({ month }: { month: number }) => month
                        ),
                      },
                      stroke: {
                        curve: 'smooth',
                      },
                    }}
                    height={364}
                  />
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={12}>
              <Card>
                <CardHeader
                  title={'Child’s Height Information'}
                  subheader={
                    'Below the graph the nurse/ user has to update information and it has to be displayed in a table after submittting'
                  }
                />

                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                  <ReactApexChart
                    type="line"
                    series={[
                      {
                        name: 'height (kg)',
                        data: child.data.attributes.height.map(
                          ({ value }: { value: number }) => value
                        ),
                      },
                    ]}
                    options={{
                      chart: {
                        id: 'heigt-charts',
                      },
                      xaxis: {
                        categories: child.data.attributes.height.map(
                          ({ month }: { month: number }) => month
                        ),
                      },
                      stroke: {
                        curve: 'smooth',
                      },
                    }}
                    height={364}
                  />
                </Box>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default ChildInformationPage;
