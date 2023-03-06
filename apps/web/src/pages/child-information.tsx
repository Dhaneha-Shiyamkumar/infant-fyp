import {
  Button,
  Card,
  CardHeader,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import ChildAttributeUpdate from '../components/child-attributes';
import { AppConfig } from '../config';

const ChildInformationPage = () => {
  const [editWeight, setEditWeight] = useState(false);
  const [editHeight, setEditHeight] = useState(false);
  const { id } = useParams();
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

      <Helmet>
        <title> Dashboard | {AppConfig.name} </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Child Information
        </Typography>

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
            </Stack>
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
                      name: 'series-1',
                      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
                    },
                  ]}
                  options={{
                    chart: {
                      id: 'apexchart-example',
                    },
                    xaxis: {
                      categories: [
                        1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
                      ],
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
                      name: 'series-1',
                      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
                    },
                  ]}
                  options={{
                    chart: {
                      id: 'apexchart-example',
                    },
                    xaxis: {
                      categories: [
                        1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
                      ],
                    },
                  }}
                  height={364}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ChildInformationPage;
